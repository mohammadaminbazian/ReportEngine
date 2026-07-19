package xyz.amin.archiveledger.mapper;

import java.util.Map;

public interface ReportRowMapper<T> {
    Map<String,Object> map(T dto);
}
