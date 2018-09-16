package ywcai.ls.bean;

import com.google.gson.annotations.SerializedName;

public class HttpBaseEntity<T> {
	@SerializedName("code")
	public int code = -1;
	@SerializedName("msg")
	public String msg = "unknown";
	@SerializedName("data")
	public T data;
}
