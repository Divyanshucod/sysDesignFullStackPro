import Functionalities.VendingMachine;
import Handlers.CancelHandler;
import Handlers.GetInformation;
import Handlers.InsetMoneyHandler;
import Handlers.SelectProductHandler;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Server {

    static VendingMachine machine;
    InsetMoneyHandler insetMoneyHandler;
    SelectProductHandler selectProductHandler;
    CancelHandler cancelHandler;
    GetInformation productInfo;

    public Server(VendingMachine machine) throws IOException {
        this.machine = machine;
        this.cancelHandler = new CancelHandler(machine);
        this.selectProductHandler = new SelectProductHandler(machine);
        this.insetMoneyHandler = new InsetMoneyHandler(machine);
        this.productInfo = new GetInformation(machine);

        // Create and start the server
        HttpServer server = createServer();
        server.start();
        System.out.println("Server is running on port 8080");
    }

    public HttpServer createServer() throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/submitMoney", this.insetMoneyHandler);
        server.createContext("/selectProduct", this.selectProductHandler);
        server.createContext("/cancelProcess", this.cancelHandler);
        server.createContext("/getProductInformation", this.productInfo);
        return server;
    }
}
