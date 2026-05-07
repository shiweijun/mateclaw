package vip.mate.agent.binding.model;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("mate_agent_knowledge_base")
public class AgentKnowledgeBaseBinding {
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    private Long agentId;
    private Long kbId;
    private Boolean enabled;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    private Integer deleted;
}
