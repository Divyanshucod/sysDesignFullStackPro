package Handlers;

import com.sun.net.httpserver.HttpExchange;

public class CorsHandlers {
    public static void addHandlers(HttpExchange exchange) {
        String origin = exchange.getRequestHeaders().getFirst("Origin");
        if (origin != null) {
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", origin);
        } else {
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        }

        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
}
