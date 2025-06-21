1. 诈骗案例数据库

| 字段名            | 类型           | 描述               |
| -------------- | ------------ | ---------------- |
| `id`           | BIGINT       | 案件ID，自增主键        |
| `title`        | VARCHAR(255) | 案件标题             |
| `date`         | DATE         | 案件时间             |
| `summary`      | TEXT         | 基本案情（诈骗经过、背景等）   |
| `verdict`      | TEXT         | 裁判结果（法院判决、处罚）    |
| `significance` | TEXT         | 典型意义（启示、警示、社会价值） |


```sql
CREATE TABLE fraud_case (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '案件ID',
    title VARCHAR(255) NOT NULL COMMENT '案件标题',
    date DATE COMMENT '案件时间',
    summary TEXT COMMENT '基本案情',
    verdict TEXT COMMENT '裁判结果',
    significance TEXT COMMENT '典型意义'
) COMMENT='金融诈骗典型案例表';
```