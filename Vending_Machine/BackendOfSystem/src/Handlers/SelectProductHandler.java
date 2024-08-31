package Handlers;

import Functionalities.VendingMachine;
import ProductTable.Product;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class SelectProductHandler implements HttpHandler {
    VendingMachine machine;

    public SelectProductHandler(VendingMachine machine) {
        this.machine = machine;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        CorsHandlers.addHandlers(exchange);
        System.out.println("Request received: " + exchange.getRequestMethod());

        if ("OPTIONS".equals(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        if ("POST".equals(exchange.getRequestMethod())) {
            try {
                InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
                JsonObject jsonObject = JsonParser.parseReader(isr).getAsJsonObject();
                int code = jsonObject.get("code").getAsInt();

                System.out.println("Product code received: " + code);
                System.out.println(machine.getListOfShelfs());
                String ProductSelected = machine.obj.SelectProduct(code);
                System.out.println(ProductSelected);
                Gson gson = new Gson();
                String response;

                if (!ProductSelected.equals("Product selected and delivered!")) {
                    double change = machine.obj.ReturnChange(0);
                    Map<String, Object> responseData = new HashMap<>();
                    responseData.put("change", change);

                        responseData.put("message", ProductSelected);

                    response = gson.toJson(responseData);
                } else {
                    Product product = machine.obj.DipositeProduct(code);
                    double change = machine.obj.ReturnChange(product.getPrice());
                    System.out.println(machine.getListOfShelfs());
                    Map<String, Object> responseData = new HashMap<>();
                    responseData.put("ProductName", product.getName());
                    responseData.put("price", product.getPrice());
                    responseData.put("code", product.getCode());
                    responseData.put("change", change);

                    response = gson.toJson(responseData);
                }
                machine.addMoney(0);
                System.out.println("Sending response: " + response);

                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, response.getBytes(StandardCharsets.UTF_8).length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes(StandardCharsets.UTF_8));
                os.close();
            } catch (Exception e) {
                e.printStackTrace();
                exchange.sendResponseHeaders(500, -1); // Internal Server Error
            }
        } else {
            exchange.sendResponseHeaders(405, -1); // Method Not Allowed
        }
    }
}