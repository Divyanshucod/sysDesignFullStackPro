package Handlers;

import Functionalities.VendingMachine;
import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class CancelHandler implements HttpHandler {
    VendingMachine machine;

    public CancelHandler(VendingMachine machine) {
        this.machine = machine;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        // Cancel process and get the change value
        CorsHandlers.addHandlers(exchange);
        if("OPTIONS".equals(exchange.getRequestMethod())){
            exchange.sendResponseHeaders(204,-1);
            return;
        }
        double val = machine.obj.CancleProcess();

        // Create a JSON object to send as a response
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(new ChangeResponse(val));

        // Set response headers
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(200, jsonResponse.getBytes(StandardCharsets.UTF_8).length);

        // Send JSON response
        OutputStream os = exchange.getResponseBody();
        os.write(jsonResponse.getBytes(StandardCharsets.UTF_8));
        os.close();
    }

    // Inner class to represent the response structure
    private static class ChangeResponse {
        double change;

        ChangeResponse(double change) {
            this.change = change;
        }
    }
}
