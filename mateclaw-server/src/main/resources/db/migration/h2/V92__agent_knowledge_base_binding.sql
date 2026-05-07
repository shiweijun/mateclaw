-- V92: Agent-KB many-to-many binding table (mirrors mate_agent_skill pattern).
-- Replaces the "KB belongs to Agent" model (agent_id on mate_wiki_knowledge_base).
-- An agent with zero rows has NO wiki access (no fallback to "public" KBs).

CREATE TABLE IF NOT EXISTS mate_agent_knowledge_base (
    id           BIGINT       NOT NULL PRIMARY KEY,
    agent_id     BIGINT       NOT NULL,
    kb_id        BIGINT       NOT NULL,
    enabled      BOOLEAN      NOT NULL DEFAULT TRUE,
    create_time  DATETIME     NOT NULL,
    update_time  DATETIME     NOT NULL,
    deleted      INT          NOT NULL DEFAULT 0
);
CREATE UNIQUE INDEX IF NOT EXISTS uk_agent_kb ON mate_agent_knowledge_base(agent_id, kb_id);
CREATE INDEX IF NOT EXISTS idx_agent_kb_agent ON mate_agent_knowledge_base(agent_id);

-- Migrate existing agent_id on mate_wiki_knowledge_base into the new binding table.
MERGE INTO mate_agent_knowledge_base (id, agent_id, kb_id, enabled, create_time, update_time, deleted)
KEY (id)
SELECT
    (agent_id * 1000000 + id),
    agent_id,
    id,
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
FROM mate_wiki_knowledge_base
WHERE agent_id IS NOT NULL
  AND deleted = 0;

-- Retain agent_id column on mate_wiki_knowledge_base but stop reading it.
