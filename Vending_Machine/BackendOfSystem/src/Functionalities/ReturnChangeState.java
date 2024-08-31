package Functionalities;

import ProductTable.Product;

public class ReturnChangeState implements StatesIn{
    VendingMachine machine;
    public ReturnChangeState(VendingMachine machine){
        this.machine = machine;
    }
    @Override
    public boolean InsertMoney(double money) {
        System.out.println("can not insert money in change returning state");
        return false;
    }
    @Override
    public String SelectProduct(int code) {
        return ("can not select product in change returning state");
    }

    @Override
    public double CancleProcess() {
        System.out.println("can not cancel process in change returning state");
        return 0;
    }

    @Override
    public double ReturnChange(double productPrice) {
        System.out.println(machine.getListOfShelfs());
        double val = (machine.getUserMoney() - productPrice);
        StatesIn obj = new InsertMoneyState(machine);
        machine.changeState(obj);
        return (val);
    }


    @Override
    public Product DipositeProduct(int code) {
        System.out.println("Product is already dispatched!");
        return null;
    }
}
