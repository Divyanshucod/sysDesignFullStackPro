package ProductTable;

public class Product {
    String name;
    double price;
    int productCode;
    public Product(String name,double price){
        this.name = name;
        this.price = price;
        this.productCode = GenerateRandomCode();
    }
    public String getName(){
        return this.name;
    }
    public double getPrice(){
        return this.price;
    }
    public int getCode(){return this.productCode;}
    public void setName(String name){
         this.name = name;
    }
    public void setPrice(double price){
         this.price = price;
    }
    public void setCode(){ this.productCode = GenerateRandomCode();}
    int GenerateRandomCode(){
        return (int) Math.floor(Math.random()*1000+1);
    }
}
