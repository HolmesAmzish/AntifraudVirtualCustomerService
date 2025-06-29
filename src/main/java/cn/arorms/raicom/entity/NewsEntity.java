package cn.arorms.raicom.entity;

import java.util.Date;

public class NewsEntity {
    private Long id;
    private String title;
    private Date date;
    private String summary;
    private String verdict;
    private String significance;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getVerdict() { return verdict; }
    public void setVerdict(String verdict) { this.verdict = verdict; }

    public String getSignificance() { return significance; }
    public void setSignificance(String significance) { this.significance = significance; }

    @Override
    public String toString() {
        return "NewsEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", date=" + date +
                ", summary='" + summary + '\'' +
                ", verdict='" + verdict + '\'' +
                ", significance='" + significance + '\'' +
                '}';
    }
}
