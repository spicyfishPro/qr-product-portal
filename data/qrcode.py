import csv
import segno


# 读取CSV文件并提取ID列
def read_ids_from_csv(filename):
    ids = []
    with open(filename, "r", encoding="utf-8-sig") as csvfile:
        reader = csv.reader(csvfile)
        headers = next(reader, None)  # 读取标题行
        print(headers)

        # 验证ID列是否存在
        if headers and headers[0].lower() != "id":
            raise ValueError("CSV文件第一列不是ID列")

        for row in reader:
            if row:  # 跳过空行
                id_value = row[0].strip()
                if id_value:  # 忽略空ID
                    ids.append(id_value)
    return ids


# 生成二维码图片
def generate_qrcodes(ids, domain="https://domain.com/?id="):
    for id_value in ids:
        url = f"{domain}{id_value}"
        safe_id = "".join(
            c for c in id_value if c.isalnum() or c in ("-", "_")
        )
        filename = f"img/qr_{safe_id}.png"
        # 一行代码生成二维码
        segno.make(url).save(filename, scale=10)
        print(f"已生成：{filename}")


if __name__ == "__main__":
    try:
        # 从CSV读取ID
        ids = read_ids_from_csv("data.csv")
        generate_qrcodes(ids, domain="https://spicyfish.cn:10033/?id=")
        print("所有二维码生成完成！")
    except Exception as e:
        print(f"发生错误：{str(e)}")
