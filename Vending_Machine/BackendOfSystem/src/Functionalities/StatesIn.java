package Functionalities;

import ProductTable.Product;

public interface StatesIn {
    public boolean InsertMoney(double money);
    public String SelectProduct(int code);
    public double CancleProcess();
    public double ReturnChange(double productPrice);
    public Product DipositeProduct(int code);
}
