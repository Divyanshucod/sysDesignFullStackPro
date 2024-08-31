package Functionalities;

import ProductTable.Product;
import ProductTable.ProductShelf;

import java.util.ArrayList;
import java.util.List;

public class VendingMachine {
    public static StatesIn obj;
    public static List<ProductShelf>listOfShelfs;
    static double money;
    public VendingMachine(){
        System.out.println("How Many Call happens!");
        listOfShelfs = new ArrayList<>();
        money = 0;
    }

    public void changeState(StatesIn state){
        obj = state;
    }
    public double getUserMoney(){
        return money;
    }
    public void addMoney(double money){
        VendingMachine.money = money;
    }
    public ProductShelf getShelf(int code){
        for(ProductShelf shelf1:listOfShelfs){
            for(Product product:shelf1.getListOfProducts()){
                if(product.getCode() == code){
                    return shelf1;
                }
            }
        }
        return null;
    }
    public void addShelfs(List<ProductShelf> listOfShelfs){
        this.listOfShelfs = listOfShelfs;
    }
    public List<ProductShelf> getListOfShelfs(){
        return listOfShelfs;
    }
}
