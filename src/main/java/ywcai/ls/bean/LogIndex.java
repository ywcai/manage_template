package ywcai.ls.bean;

public class LogIndex {
    public int cacheTypeIndex = 0;//取自AppConfig中的索引
    public String cacheFileName = "日志名称";//名字等于TYPE+"-"+START_TIME格式。后台使用，前台不展示
    public String aliasFileName = "标题名称";//自行编辑的别名，在列表中显示，默认显示当前时间。
    public String remarks = "结果摘要";//备注信息。默认为pingState中ip,max,min,avg,loss,total的格式化信息。
    public String logTime = "日志起始日期";
    public String addr = "未知地址";//最终保存数据时的位置。
    public long recordId=0;
	@Override
	public String toString() {
		return "LogIndex [cacheTypeIndex=" + cacheTypeIndex + ", cacheFileName=" + cacheFileName + ", aliasFileName="
				+ aliasFileName + ", remarks=" + remarks + ", logTime=" + logTime + ", addr=" + addr + "]";
	}
    
}
