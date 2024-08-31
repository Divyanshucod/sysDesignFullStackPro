package Functionalities;

import ProductTable.Product;
import ProductTable.ProductShelf;

public class ProductSelectionState implements StatesIn{
    VendingMachine machine;
    public ProductSelectionState(VendingMachine machine){
        this.machine = machine;
    }
    @Override
    public boolean InsertMoney(double money) {
        System.out.println("Can't insert money in this state product selection state");
        return false;
    }

    @Override
    public String SelectProduct(int code) {
        System.out.println("called select product");
        ProductShelf shelf = machine.getShelf(code);
        System.out.println(shelf);
        if(shelf == null){
            return "can't select product in this state!";
        }
        Product product = shelf.getProduct(code);
        double costOfProduct =  product.getPrice();
        if(machine.getUserMoney() < costOfProduct){
            System.out.println("Not An Enough Money To Buy a Product!");
            StatesIn obj = new ReturnChangeState(machine);
            //change state to returnChange
            machine.changeState(obj);
            return "Not An Enough Money To Buy a Product!";
        }
        //change state to return Change
        StatesIn obj = new ProductDispatchState(machine);
        machine.changeState(obj);
        return "Product selected and delivered!";
    }

    @Override
    public double CancleProcess() {
        // change to cancel state
        StatesIn obj = new CancelState(machine);
        machine.changeState(obj);
        return obj.CancleProcess();
    }
    @Override
    public double ReturnChange(double productPrice) {
        System.out.println("Can't return change in the Product selection state");
        return 0;
    }
    @Override
    public Product DipositeProduct(int code) {
        System.out.println("Can't deposite product in the product selection state.");
        return null;
    }
}
