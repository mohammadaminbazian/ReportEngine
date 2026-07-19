package xyz.amin.archiveledger.service;



import org.springframework.stereotype.Service;
import xyz.amin.archiveledger.dto.ReportContextDto;
import xyz.amin.archiveledger.entity.ReportContext;
import xyz.amin.archiveledger.repository.ReportContextRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReportContextServiceImpl implements ReportContextService {

    private final ReportContextRepository repository;

    public ReportContextServiceImpl(ReportContextRepository repository) {
        this.repository = repository;
    }

    @Override
    public ReportContextDto save(ReportContextDto dto) {

        ReportContext entity = toEntity(dto);

        entity = repository.save(entity);

        return toDto(entity);
    }

    @Override
    public ReportContextDto update(Long id, ReportContextDto dto) {

        ReportContext entity = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("ReportContext not found : " + id));

        entity.setReportName(dto.getReportName());
        entity.setSection(dto.getSection());
        entity.setKeyName(dto.getKeyName());
        entity.setLabel(dto.getLabel());
        entity.setValue(dto.getValue());
        entity.setSortOrder(dto.getSortOrder());
        entity.setActive(dto.getActive());
        entity.setParentKey(dto.getParentKey());

        entity = repository.save(entity);

        return toDto(entity);
    }

    @Override
    public List<ReportContextDto> findAll() {

        return repository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());

    }

    @Override
    public ReportContextDto findById(Long id) {

        Optional<ReportContext> optional = repository.findById(id);

        return optional.map(this::toDto).orElse(null);

    }

    @Override
    public List<ReportContextDto> findByReportName(String reportName) {

        return repository.findByReportName(reportName)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());

    }

    @Override
    public List<ReportContextDto> findByReportNameAndSection(
            String reportName,
            String section) {

        return repository
                .findByReportNameAndSection(reportName, section)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());

    }

    @Override
    public void delete(Long id) {

        repository.deleteById(id);

    }

    //==================================================
    // DTO -> Entity
    //==================================================

    private ReportContext toEntity(ReportContextDto dto) {

        ReportContext entity = new ReportContext();

        entity.setId(dto.getId());
        entity.setReportName(dto.getReportName());
        entity.setSection(dto.getSection());
        entity.setKeyName(dto.getKeyName());
        entity.setLabel(dto.getLabel());
        entity.setValue(dto.getValue());
        entity.setSortOrder(dto.getSortOrder());
        entity.setActive(dto.getActive());
        entity.setParentKey(dto.getParentKey());

        return entity;

    }

    //==================================================
    // Entity -> DTO
    //==================================================

    private ReportContextDto toDto(ReportContext entity) {

        ReportContextDto dto = new ReportContextDto();

        dto.setId(entity.getId());
        dto.setReportName(entity.getReportName());
        dto.setSection(entity.getSection());
        dto.setKeyName(entity.getKeyName());
        dto.setLabel(entity.getLabel());
        dto.setValue(entity.getValue());
        dto.setSortOrder(entity.getSortOrder());
        dto.setActive(entity.getActive());
        dto.setParentKey(entity.getParentKey());

        return dto;

    }

}