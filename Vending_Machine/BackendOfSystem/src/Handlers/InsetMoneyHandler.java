package Handlers;

import Functionalities.VendingMachine;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class InsetMoneyHandler implements HttpHandler {
    VendingMachine machine;

    public InsetMoneyHandler(VendingMachine machine) {
        this.machine = machine;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        CorsHandlers.addHandlers(exchange);
        if("OPTIONS".equals(exchange.getRequestMethod())){
            exchange.sendResponseHeaders(204,-1);
            return;
        }
        if ("POST".equals(exchange.getRequestMethod())) {
            try {
                // Read the incoming request body
                BufferedReader reader = new BufferedReader(new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8));
                StringBuilder requestBody = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    requestBody.append(line);
                }

                // Parse the request body to extract the money value
                Gson gson = new Gson();
                JsonObject jsonObject = gson.fromJson(requestBody.toString(), JsonObject.class);
                double money = jsonObject.get("money").getAsDouble();

                // Insert the money into the vending machine
                boolean val = machine.obj.InsertMoney(money);

                // Prepare the response
                String response;
                if (val) {
                    response = "Money received";
                } else {
                    response = "Money not received";
                }

                // Send the response
                exchange.getResponseHeaders().set("Content-Type", "text/plain");
                exchange.sendResponseHeaders(200, response.getBytes(StandardCharsets.UTF_8).length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes(StandardCharsets.UTF_8));
                os.close();

            } catch (JsonSyntaxException | NumberFormatException e) {
                // Handle JSON parsing error or number format error
                exchange.sendResponseHeaders(400, -1); // 400 Bad Request
            }
        } else {
            // Handle other HTTP methods if necessary
            exchange.sendResponseHeaders(405, -1); // Method Not Allowed
        }
    }
}

