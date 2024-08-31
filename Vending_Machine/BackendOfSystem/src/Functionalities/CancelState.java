package Functionalities;
import ProductTable.Product;

public class CancelState implements StatesIn{
    VendingMachine machine;
    public CancelState(VendingMachine machine){
        this.machine = machine;
    }
    @Override
    public boolean InsertMoney(double money) {
        System.out.println("You can't insert money in cancellation state!");
        return false;
    }
    @Override
    public String SelectProduct(int code) {
        return ("You can't select product in cancellation state!");
    }

    @Override
    public double CancleProcess() {
        StatesIn nextState = new ReturnChangeState(machine);
        machine.changeState(nextState);
        return nextState.ReturnChange(0);
    }

    @Override
    public double ReturnChange(double productPrice) {
        System.out.println("Can't return money ih the cancel state");
        return 0;
    }

    @Override
    public Product DipositeProduct(int code) {
        System.out.println("Can't dispatch the product in cancel state");
        return null;
    }
}
