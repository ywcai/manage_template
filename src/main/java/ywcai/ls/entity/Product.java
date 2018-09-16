package ywcai.ls.entity;


public class Product {
	public Integer uid;
	public int productid;
	public int packcode;
	public int flowsize;
	public int price;
	public int rate;
	public int local;
	public String operator;
	public String province;
	public String des;
	public int delflag;
	@Override
	public String toString() {
		return "Product [uid=" + uid + ", productid=" + productid + ", packcode=" + packcode + ", flowsize=" + flowsize
				+ ", price=" + price + ", rate=" + rate + ", local=" + local + ", operator=" + operator + ", province="
				+ province + ", des=" + des + ", delflag=" + delflag + "]";
	}
}
