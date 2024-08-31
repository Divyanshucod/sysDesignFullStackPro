package Handlers;

import Functionalities.VendingMachine;
import ProductTable.Product;
import ProductTable.ProductShelf;
import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.google.gson.JsonSyntaxException;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;

import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetInformation implements HttpHandler {
    static VendingMachine machine;
    public GetInformation(VendingMachine machine){
        this.machine = machine;
    }
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        CorsHandlers.addHandlers(exchange);
        System.out.println("come to getInformation");
        if("OPTIONS".equals(exchange.getRequestMethod())){
            exchange.sendResponseHeaders(204,-1);
            return;
        }
        try {
            // Get the list of shelves from the vending machine
            List<ProductShelf> shelves = machine.getListOfShelfs();
            System.out.println("got list");
            System.out.println(shelves);
            // Build the response data in the required format
            List<Map<String, Object>> responseData = new ArrayList<>();

            for (ProductShelf shelf : shelves) {
                Map<String, Object> shelfData = new HashMap<>();
                shelfData.put("shelfType", shelf.getTypeOfShelf());

                List<Map<String, Object>> productsList = new ArrayList<>();
                for (Product product : shelf.getListOfProducts()) {
                    Map<String, Object> productData = new HashMap<>();
                    productData.put("ProductName", product.getName());
                    productData.put("ProductPrice", product.getPrice());
                    productData.put("productCode", product.getCode());
                    productsList.add(productData);
                }

                shelfData.put("listofproducts", productsList);
                responseData.add(shelfData);
                System.out.println(shelfData);
            };
            System.out.println("listOfproduct got created");
            // Convert the response data to JSON using Gson
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(responseData);

            // Send the JSON response
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, jsonResponse.getBytes(StandardCharsets.UTF_8).length);
            OutputStream os = exchange.getResponseBody();
            os.write(jsonResponse.getBytes(StandardCharsets.UTF_8));
            os.close();

        } catch (JsonSyntaxException err) {
            throw new IOException("Error processing JSON", err);
        }
    }
}
