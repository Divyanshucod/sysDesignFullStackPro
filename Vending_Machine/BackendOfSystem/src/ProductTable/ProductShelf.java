package ProductTable;

import java.util.ArrayList;
import java.util.List;

public class ProductShelf {
    int shelfNo;
    String type;
    List<Product>listOfProducts;
    public ProductShelf(String type){
        this.type = type;
        this.shelfNo = GenerateCode();
        this.listOfProducts = new ArrayList<>();
    }
    public String getTypeOfShelf(){
        return this.type;
    }
    public int getShelfNo(){
        return this.shelfNo;
    }
    public void getTypeOfShelf(String type){
         this.type = type;
    }
    public void setShelfNo(){
         this.shelfNo = GenerateCode();
    }
    public Product getProduct(int productCode){
        for(Product product:listOfProducts){
            if(product.getCode() == productCode){
                return product;
            }
        }
        return null;
    }
    public List<Product> getListOfProducts(){
        return  this.listOfProducts;
    }
    public void removeProduct(Product product){
        listOfProducts.remove(product);
    }
    public void setProduct(Product product){
        listOfProducts.add(product);
    }
    int GenerateCode(){
        return (int) Math.floor(Math.random()*100+1);
    }
}
