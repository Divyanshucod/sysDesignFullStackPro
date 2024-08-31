package Functionalities;

import ProductTable.Product;
import ProductTable.ProductShelf;



public class ProductDispatchState implements StatesIn{
    VendingMachine machine;
    public ProductDispatchState(VendingMachine machine){
        this.machine = machine;
    }
    @Override
    public boolean InsertMoney(double money) {
        System.out.println("can't insert money in Product dispatch state");
        return false;
    }

    @Override
    public String SelectProduct(int code) {
        return "can't select product in Product dispatch state" ;
    }

    @Override
    public double CancleProcess() {
        System.out.println("can't cancel process in Product dispatch state");
        return 0;
    }
    @Override
    public double ReturnChange(double productPrice) {
        System.out.println("can't return change in dispatch state.");
        return 0;
    }

    @Override
    public Product DipositeProduct(int code) {

        ProductShelf shelf = machine.getShelf(code);
        Product product = shelf.getProduct(code);
        shelf.removeProduct(product);
        System.out.println("after the removal "+machine.getListOfShelfs());
        StatesIn obj = new ReturnChangeState(machine);
        machine.changeState(obj);
        return product;
    }
}
