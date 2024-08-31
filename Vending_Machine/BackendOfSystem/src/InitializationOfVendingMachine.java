import Functionalities.InsertMoneyState;
import Functionalities.VendingMachine;
import ProductTable.Product;
import ProductTable.ProductShelf;

import java.util.ArrayList;
import java.util.List;

public class InitializationOfVendingMachine {
    static VendingMachine vendingMachine = null;
    public InitializationOfVendingMachine(VendingMachine machine){
        this.vendingMachine = machine;
    }
    public void initializeMachine(){
        String[][] listOfProducts = {{"Mango Juice","Apple Juice","PineApple Juice"},{"Coca Cola","Maaza/Frooti","Pepsi"},{"Milk Shake","Ice Cream Shake","Cream Shake"}};
        //creating shelf
        VendingMachine.obj = new InsertMoneyState(this.vendingMachine);
        List<ProductShelf> productShelves = createShelf(3);
        //add products in shelf's
        int j=0;
        for (ProductShelf productShelf:productShelves){
            for(int i=0;i<3;i++){
                productShelf.setProduct(new Product(listOfProducts[j][i],generatePrice()));
            }
            j++;
        }
        this.vendingMachine.addShelfs(productShelves);
    }
    public List<ProductShelf> createShelf(int noOfShelf){
        String[] listOfType = {"juice","Soft drinks","Shakes"};
        List<ProductShelf> listOfShelfs = new ArrayList<>();
        for (int i=0;i<noOfShelf;i++){
            listOfShelfs.add(new ProductShelf(listOfType[i]));
        }
        return listOfShelfs;
    }
    private double generatePrice(){
        return Math.floor(Math.random()*100+1);
    }
}
