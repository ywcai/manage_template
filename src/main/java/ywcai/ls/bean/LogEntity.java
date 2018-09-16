package ywcai.ls.bean;

public class LogEntity {
    public LogIndex logIndex=new LogIndex();
    public String data="null";
    public int max=-1;
	@Override
	public String toString() {
		return "LogEntity [logIndex=" + logIndex.toString() + ", data=" + data + "]";
	}
    
}
