package Functionalities;

import ProductTable.Product;

public class InsertMoneyState implements StatesIn{
    VendingMachine machine;
    public InsertMoneyState(VendingMachine machine){
        this.machine = machine;
    }
    @Override
    public boolean InsertMoney(double money) {
        machine.addMoney(money);
        // state change
        StatesIn state = new ProductSelectionState(machine);
        machine.changeState(state);
        if(machine.obj instanceof ProductSelectionState){
            System.out.println("State changes");
        }
        return true;
    }
    @Override
    public String SelectProduct(int code) {
        return ("can not select product in insertMoney State");
    }

    @Override
    public double CancleProcess() {
        System.out.println("can not cancel process in insertMoney State");
        return 0;
    }

    @Override
    public double ReturnChange(double productPrice) {
        System.out.println("can not return change in insert Money State");
        return 0;
    }

    @Override
    public Product DipositeProduct(int code) {
        System.out.println("can't diposite product insertMoney state.");
        return null;
    }
}
