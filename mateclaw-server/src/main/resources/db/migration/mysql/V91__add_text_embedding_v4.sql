-- V91: Add DashScope text-embedding-v4 model
-- 与 v3 共享同一 provider/协议，默认 1024 维。系统默认仍为 v3 (1000001001)。

INSERT INTO mate_model_config (id, name, provider, model_name, description, temperature, max_tokens, top_p, builtin, enabled, is_default, model_type, create_time, update_time, deleted)
VALUES (1000001003, 'Text Embedding v4', 'dashscope', 'text-embedding-v4',
        'DashScope 通义千问 v4 通用文本向量模型（1024 维）', 0, 0, 0,
        TRUE, TRUE, FALSE, 'embedding', NOW(), NOW(), 0)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  model_name = VALUES(model_name),
  description = VALUES(description),
  builtin = VALUES(builtin),
  enabled = VALUES(enabled),
  update_time = VALUES(update_time);
