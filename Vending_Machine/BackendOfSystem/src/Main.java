import Functionalities.VendingMachine;

import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            // Initialize vending machine
            VendingMachine vendingMachine = new VendingMachine();
            InitializationOfVendingMachine initialization = new InitializationOfVendingMachine(vendingMachine);
            initialization.initializeMachine();

            // Start the server
            new Server(vendingMachine);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

