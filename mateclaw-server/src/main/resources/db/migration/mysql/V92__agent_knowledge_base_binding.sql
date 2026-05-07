-- V92: Agent-KB many-to-many binding table (mirrors mate_agent_skill pattern).
-- Replaces the "KB belongs to Agent" model (agent_id on mate_wiki_knowledge_base).
-- An agent with zero rows has NO wiki access (no fallback to "public" KBs).

CREATE TABLE IF NOT EXISTS mate_agent_knowledge_base (
    id           BIGINT       NOT NULL PRIMARY KEY,
    agent_id     BIGINT       NOT NULL,
    kb_id        BIGINT       NOT NULL,
    enabled      TINYINT(1)   NOT NULL DEFAULT 1,
    create_time  DATETIME     NOT NULL,
    update_time  DATETIME     NOT NULL,
    deleted      INT          NOT NULL DEFAULT 0,
    UNIQUE KEY uk_agent_kb (agent_id, kb_id),
    KEY idx_agent_kb_agent (agent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Migrate existing agent_id on mate_wiki_knowledge_base into the new binding table.
-- Rows where agent_id IS NOT NULL get a corresponding binding row.
-- Rows where agent_id IS NULL ("public" KBs) are NOT migrated —
-- the new model requires explicit binding.
INSERT INTO mate_agent_knowledge_base (id, agent_id, kb_id, enabled, create_time, update_time, deleted)
SELECT
    (agent_id * 1000000 + id),
    agent_id,
    id,
    1,
    NOW(),
    NOW(),
    0
FROM mate_wiki_knowledge_base
WHERE agent_id IS NOT NULL
  AND deleted = 0;

-- Retain agent_id column on mate_wiki_knowledge_base but stop reading it.
