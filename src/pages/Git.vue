<script setup>
import { ref, onMounted } from 'vue'
import { NPageHeader, NCard, NTab, NTabs, NTabPane, NSpace, NText, NDivider, NList, NListItem, NTooltip, NSpin } from 'naive-ui'
import { codeToHtml } from 'shiki'

const activeTab = ref('basic')
const highlightedCode = ref({})
const isLoading = ref(false)

const gitCommands = {
  basic: [
    {
      title: '初始化与配置',
      commands: [
        {
          name: 'git init',
          description: '初始化一个新的 Git 仓库',
          example: 'git init',
          scenario: '创建新项目时使用'
        },
        {
          name: 'git config',
          description: '配置 Git 用户名和邮箱',
          example: 'git config --global user.name "Your Name"\ngit config --global user.email "your.email@example.com"',
          scenario: '首次使用 Git 时配置身份信息'
        },
        {
          name: 'git clone',
          description: '克隆远程仓库到本地',
          example: 'git clone https://github.com/username/repository.git',
          scenario: '获取已有项目的代码'
        }
      ]
    },
    {
      title: '基本操作',
      commands: [
        {
          name: 'git add',
          description: '将文件添加到暂存区',
          example: 'git add file.txt\ngit add .',
          scenario: '修改文件后准备提交'
        },
        {
          name: 'git commit',
          description: '提交暂存区的更改',
          example: 'git commit -m "Add new feature"',
          scenario: '完成一个功能或修复后提交代码'
        },
        {
          name: 'git status',
          description: '查看工作区和暂存区的状态',
          example: 'git status',
          scenario: '检查当前代码状态'
        },
        {
          name: 'git log',
          description: '查看提交历史',
          example: 'git log\ngit log --oneline',
          scenario: '查看项目的提交历史'
        }
      ]
    }
  ],
  advanced: [
    {
      title: '分支管理',
      commands: [
        {
          name: 'git branch',
          description: '列出、创建或删除分支',
          example: 'git branch\ngit branch feature-branch\ngit branch -d feature-branch',
          scenario: '创建新功能分支或管理现有分支'
        },
        {
          name: 'git checkout',
          description: '切换分支或恢复文件',
          example: 'git checkout feature-branch\ngit checkout -b new-branch',
          scenario: '切换到不同分支开发'
        },
        {
          name: 'git merge',
          description: '合并分支',
          example: 'git merge feature-branch',
          scenario: '将功能分支合并到主分支'
        },
        {
          name: 'git rebase',
          description: '变基操作，整理提交历史',
          example: 'git rebase main',
          scenario: '保持提交历史的整洁'
        }
      ]
    },
    {
      title: '远程操作',
      commands: [
        {
          name: 'git remote',
          description: '管理远程仓库',
          example: 'git remote -v\ngit remote add origin https://github.com/username/repository.git',
          scenario: '配置远程仓库地址'
        },
        {
          name: 'git push',
          description: '推送本地更改到远程仓库',
          example: 'git push origin main\ngit push -u origin feature-branch',
          scenario: '将本地代码推送到远程'
        },
        {
          name: 'git pull',
          description: '从远程仓库拉取并合并更改',
          example: 'git pull origin main',
          scenario: '获取远程仓库的最新更改'
        },
        {
          name: 'git fetch',
          description: '从远程仓库获取更改但不合并',
          example: 'git fetch origin',
          scenario: '查看远程仓库的更改但暂不合并'
        }
      ]
    }
  ],
  scenarios: [
    {
      title: '常见使用场景',
      scenarios: [
        {
          title: '场景1：修复 bug',
          steps: [
            'git checkout main',
            'git pull',
            'git checkout -b bugfix-123',
            '// 修复 bug',
            'git add .',
            'git commit -m "Fix bug #123"',
            'git push -u origin bugfix-123',
            '// 创建 Pull Request'
          ],
          description: '创建专门的 bug 修复分支'
        },
        {
          title: '场景2：开发新功能',
          steps: [
            'git checkout main',
            'git pull',
            'git checkout -b feature-new-login',
            '// 开发新功能',
            'git add .',
            'git commit -m "Add new login feature"',
            'git push -u origin feature-new-login',
            '// 创建 Pull Request'
          ],
          description: '在新分支上开发功能'
        },
        {
          title: '场景3：撤销更改',
          steps: [
            '// 撤销工作区更改',
            'git checkout -- file.txt',
            '// 撤销暂存区更改',
            'git reset HEAD file.txt',
            '// 撤销提交',
            'git revert HEAD',
            '// 重置到之前的提交',
            'git reset --hard HEAD~1'
          ],
          description: '撤销不同阶段的更改'
        },
        {
          title: '场景4：标签管理',
          steps: [
            '// 创建标签',
            'git tag v1.0.0',
            '// 推送标签',
            'git push origin v1.0.0',
            '// 查看标签',
            'git tag',
            '// 基于标签创建分支',
            'git checkout -b release-v1.0.0 v1.0.0'
          ],
          description: '管理版本标签'
        }
      ]
    }
  ]
}

const highlightCode = async () => {
  isLoading.value = true
  
  try {
    // 高亮基本命令示例
    for (const category of gitCommands.basic) {
      for (const cmd of category.commands) {
        const key = `basic-${category.title}-${cmd.name}`
        if (!highlightedCode.value[key]) {
          highlightedCode.value[key] = await codeToHtml(cmd.example, {
            lang: 'bash',
            theme: 'github-dark'
          })
        }
      }
    }
    
    // 高亮高级命令示例
    for (const category of gitCommands.advanced) {
      for (const cmd of category.commands) {
        const key = `advanced-${category.title}-${cmd.name}`
        if (!highlightedCode.value[key]) {
          highlightedCode.value[key] = await codeToHtml(cmd.example, {
            lang: 'bash',
            theme: 'github-dark'
          })
        }
      }
    }
    
    // 高亮场景示例
    for (const category of gitCommands.scenarios) {
      for (const scenario of category.scenarios) {
        const key = `scenario-${scenario.title}`
        if (!highlightedCode.value[key]) {
          const stepsCode = scenario.steps.join('\n')
          highlightedCode.value[key] = await codeToHtml(stepsCode, {
            lang: 'bash',
            theme: 'github-dark'
          })
        }
      }
    }
  } catch (error) {
    console.error('代码高亮失败:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  highlightCode()
})
</script>

<template>
  <div class="git-page">
    <NPageHeader title="Git 命令及使用场景" style="margin-bottom: 24px;">
      <template #subtitle>
        <NText depth="3">
          常用 Git 命令及具体使用场景示例，帮助你更高效地使用 Git 进行版本控制
        </NText>
      </template>
    </NPageHeader>

    <NSpin :show="isLoading">
      <NTabs v-model:value="activeTab" type="line" animated>
        <NTabPane name="basic" tab="基本命令">
          <NSpace vertical size="large">
            <NCard v-for="category in gitCommands.basic" :key="category.title" :title="category.title">
              <NSpace vertical size="medium">
                <NCard
                  v-for="cmd in category.commands"
                  :key="cmd.name"
                  size="small"
                  :bordered="true"
                >
                  <div class="git-command">
                    <div class="command-header">
                      <NText strong>{{ cmd.name }}</NText>
                      <NTag size="small" type="info">{{ cmd.scenario }}</NTag>
                    </div>
                    <NText depth="2" style="margin: 8px 0;">{{ cmd.description }}</NText>
                    <NDivider style="margin: 8px 0;" />
                    <NText strong>示例：</NText>
                    <div v-if="highlightedCode[`basic-${category.title}-${cmd.name}`]" v-html="highlightedCode[`basic-${category.title}-${cmd.name}`]" class="shiki-code"></div>
                    <div v-else class="loading-placeholder">加载中...</div>
                  </div>
                </NCard>
              </NSpace>
            </NCard>
          </NSpace>
        </NTabPane>
        <NTabPane name="advanced" tab="高级命令">
          <NSpace vertical size="large">
            <NCard v-for="category in gitCommands.advanced" :key="category.title" :title="category.title">
              <NSpace vertical size="medium">
                <NCard
                  v-for="cmd in category.commands"
                  :key="cmd.name"
                  size="small"
                  :bordered="true"
                >
                  <div class="git-command">
                    <div class="command-header">
                      <NText strong>{{ cmd.name }}</NText>
                      <NTag size="small" type="info">{{ cmd.scenario }}</NTag>
                    </div>
                    <NText depth="2" style="margin: 8px 0;">{{ cmd.description }}</NText>
                    <NDivider style="margin: 8px 0;" />
                    <NText strong>示例：</NText>
                    <div v-if="highlightedCode[`advanced-${category.title}-${cmd.name}`]" v-html="highlightedCode[`advanced-${category.title}-${cmd.name}`]" class="shiki-code"></div>
                    <div v-else class="loading-placeholder">加载中...</div>
                  </div>
                </NCard>
              </NSpace>
            </NCard>
          </NSpace>
        </NTabPane>
        <NTabPane name="scenarios" tab="使用场景">
          <NSpace vertical size="large">
            <NCard v-for="category in gitCommands.scenarios" :key="category.title" :title="category.title">
              <NSpace vertical size="medium">
                <NCard
                  v-for="scenario in category.scenarios"
                  :key="scenario.title"
                  size="small"
                  :bordered="true"
                >
                  <div class="git-scenario">
                    <NText strong>{{ scenario.title }}</NText>
                    <NText depth="2" style="margin: 8px 0;">{{ scenario.description }}</NText>
                    <NDivider style="margin: 8px 0;" />
                    <NText strong>操作步骤：</NText>
                    <div v-if="highlightedCode[`scenario-${scenario.title}`]" v-html="highlightedCode[`scenario-${scenario.title}`]" class="shiki-code"></div>
                    <div v-else class="loading-placeholder">加载中...</div>
                  </div>
                </NCard>
              </NSpace>
            </NCard>
          </NSpace>
        </NTabPane>
      </NTabs>
    </NSpin>
  </div>
</template>

<style scoped>
.git-page {
  max-width: 1200px;
  margin: 0 auto;
}

.git-command {
  padding: 8px 0;
}

.git-scenario {
  padding: 8px 0;
}

.command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.shiki-code {
  background: #2d2d2d;
  color: #e0e0e0;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #404040;
  margin-top: 8px;
}

.shiki-code pre {
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
}

.shiki-code code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.loading-placeholder {
  background: #2d2d2d;
  color: #888;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #404040;
  margin-top: 8px;
}
</style>
