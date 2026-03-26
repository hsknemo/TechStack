<script setup>
import { ref, onMounted } from 'vue'
import { NPageHeader, NCard, NTab, NTabs, NTabPane, NSpace, NText, NDivider, NList, NListItem, NTooltip, NSpin } from 'naive-ui'
import { codeToHtml } from 'shiki'

const activeTab = ref('basic')
const highlightedCode = ref({})
const isLoading = ref(false)

const linuxCommands = {
  basic: [
    {
      title: '文件管理',
      commands: [
        {
          name: 'ls',
          description: '列出目录内容',
          example: 'ls -la\nls -lh',
          scenario: '查看目录中的文件和文件夹'
        },
        {
          name: 'cd',
          description: '切换目录',
          example: 'cd /path/to/directory\ncd ..',
          scenario: '在不同目录间切换'
        },
        {
          name: 'pwd',
          description: '显示当前工作目录',
          example: 'pwd',
          scenario: '查看当前所在位置'
        },
        {
          name: 'mkdir',
          description: '创建目录',
          example: 'mkdir new_directory\nmkdir -p parent/child/directory',
          scenario: '创建新的目录结构'
        },
        {
          name: 'rm',
          description: '删除文件或目录',
          example: 'rm file.txt\nrm -rf directory',
          scenario: '删除不需要的文件或目录'
        },
        {
          name: 'cp',
          description: '复制文件或目录',
          example: 'cp file.txt new_file.txt\ncp -r directory new_directory',
          scenario: '复制文件或目录'
        },
        {
          name: 'mv',
          description: '移动或重命名文件',
          example: 'mv old.txt new.txt\nmv file.txt /path/to/directory',
          scenario: '重命名文件或移动文件到其他位置'
        },
        {
          name: 'touch',
          description: '创建空文件',
          example: 'touch new_file.txt',
          scenario: '创建新的空文件'
        }
      ]
    },
    {
      title: '文件内容',
      commands: [
        {
          name: 'cat',
          description: '查看文件内容',
          example: 'cat file.txt',
          scenario: '查看文件的全部内容'
        },
        {
          name: 'head',
          description: '查看文件开头',
          example: 'head file.txt\nhead -n 10 file.txt',
          scenario: '查看文件的前几行'
        },
        {
          name: 'tail',
          description: '查看文件结尾',
          example: 'tail file.txt\ntail -n 10 file.txt\ntail -f log.txt',
          scenario: '查看文件的最后几行或实时监控日志'
        },
        {
          name: 'less',
          description: '分页查看文件内容',
          example: 'less file.txt',
          scenario: '查看大文件的内容'
        },
        {
          name: 'grep',
          description: '在文件中搜索内容',
          example: 'grep "pattern" file.txt\ngrep -r "pattern" directory',
          scenario: '在文件或目录中搜索特定内容'
        },
        {
          name: 'sed',
          description: '文本替换',
          example: 'sed \'s/old/new/g\' file.txt',
          scenario: '替换文件中的文本'
        }
      ]
    }
  ],
  system: [
    {
      title: '系统管理',
      commands: [
        {
          name: 'ps',
          description: '查看进程',
          example: 'ps aux\nps -ef',
          scenario: '查看系统中运行的进程'
        },
        {
          name: 'top',
          description: '实时查看系统资源使用情况',
          example: 'top',
          scenario: '监控系统资源使用情况'
        },
        {
          name: 'htop',
          description: '交互式进程查看器',
          example: 'htop',
          scenario: '更友好地查看和管理进程'
        },
        {
          name: 'kill',
          description: '终止进程',
          example: 'kill PID\nkill -9 PID',
          scenario: '终止指定的进程'
        },
        {
          name: 'df',
          description: '查看磁盘空间使用情况',
          example: 'df -h',
          scenario: '查看磁盘空间使用情况'
        },
        {
          name: 'du',
          description: '查看目录大小',
          example: 'du -sh directory',
          scenario: '查看目录占用的磁盘空间'
        },
        {
          name: 'free',
          description: '查看内存使用情况',
          example: 'free -h',
          scenario: '查看系统内存使用情况'
        },
        {
          name: 'uname',
          description: '查看系统信息',
          example: 'uname -a',
          scenario: '查看系统版本和架构信息'
        }
      ]
    },
    {
      title: '网络管理',
      commands: [
        {
          name: 'ifconfig',
          description: '查看网络接口配置',
          example: 'ifconfig',
          scenario: '查看网络接口的配置信息'
        },
        {
          name: 'ip',
          description: '网络配置工具',
          example: 'ip addr\nip route',
          scenario: '查看和配置网络接口'
        },
        {
          name: 'ping',
          description: '测试网络连接',
          example: 'ping google.com',
          scenario: '测试网络连接是否正常'
        },
        {
          name: 'curl',
          description: 'HTTP 客户端工具',
          example: 'curl https://example.com\ncurl -X POST -d "data" https://example.com',
          scenario: '发送 HTTP 请求或下载文件'
        },
        {
          name: 'wget',
          description: '下载文件',
          example: 'wget https://example.com/file.zip',
          scenario: '从网络上下载文件'
        },
        {
          name: 'netstat',
          description: '查看网络连接',
          example: 'netstat -tuln',
          scenario: '查看系统的网络连接状态'
        }
      ]
    }
  ],
  scenarios: [
    {
      title: '常见使用场景',
      scenarios: [
        {
          title: '场景1：查找大文件',
          steps: [
            '// 查找当前目录下大于 100MB 的文件',
            'find . -type f -size +100M -exec ls -lh {} \\;',
            '// 查找系统中最大的 10 个文件',
            'find / -type f -exec ls -lh {} \\; | sort -k5 -r | head -10'
          ],
          description: '查找系统中的大文件以释放空间'
        },
        {
          title: '场景2：批量重命名文件',
          steps: [
            '// 将所有 .txt 文件重命名为 .md',
            'for file in *.txt; do mv "$file" "${file%.txt}.md"; done',
            '// 批量添加前缀',
            'for file in *.jpg; do mv "$file" "prefix_$file"; done'
          ],
          description: '批量重命名文件'
        },
        {
          title: '场景3：监控日志文件',
          steps: [
            '// 实时监控日志文件',
            'tail -f /var/log/syslog',
            '// 查看包含错误的日志',
            'grep "ERROR" /var/log/application.log',
            '// 统计错误数量',
            'grep -c "ERROR" /var/log/application.log'
          ],
          description: '监控和分析日志文件'
        },
        {
          title: '场景4：压缩和解压缩',
          steps: [
            '// 压缩文件为 tar.gz',
            'tar -czvf archive.tar.gz directory/',
            '// 解压缩 tar.gz 文件',
            'tar -xzvf archive.tar.gz',
            '// 压缩为 zip 文件',
            'zip -r archive.zip directory/',
            '// 解压缩 zip 文件',
            'unzip archive.zip'
          ],
          description: '文件压缩和解压缩操作'
        },
        {
          title: '场景5：系统服务管理',
          steps: [
            '// 查看服务状态',
            'systemctl status nginx',
            '// 启动服务',
            'sudo systemctl start nginx',
            '// 停止服务',
            'sudo systemctl stop nginx',
            '// 重启服务',
            'sudo systemctl restart nginx',
            '// 设置服务开机自启',
            'sudo systemctl enable nginx'
          ],
          description: '管理系统服务'
        }
      ]
    }
  ]
}

const highlightCode = async () => {
  isLoading.value = true
  
  try {
    // 高亮基本命令示例
    for (const category of linuxCommands.basic) {
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
    
    // 高亮系统命令示例
    for (const category of linuxCommands.system) {
      for (const cmd of category.commands) {
        const key = `system-${category.title}-${cmd.name}`
        if (!highlightedCode.value[key]) {
          highlightedCode.value[key] = await codeToHtml(cmd.example, {
            lang: 'bash',
            theme: 'github-dark'
          })
        }
      }
    }
    
    // 高亮场景示例
    for (const category of linuxCommands.scenarios) {
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
  <div class="linux-page">
    <NPageHeader title="Linux 常用命令及使用示例" style="margin-bottom: 24px;">
      <template #subtitle>
        <NText depth="3">
          常用 Linux 命令及具体使用场景示例，帮助你更高效地使用 Linux 系统
        </NText>
      </template>
    </NPageHeader>

    <NSpin :show="isLoading">
      <NTabs v-model:value="activeTab" type="line" animated>
        <NTabPane name="basic" tab="基本命令">
          <NSpace vertical size="large">
            <NCard v-for="category in linuxCommands.basic" :key="category.title" :title="category.title">
              <NSpace vertical size="medium">
                <NCard
                  v-for="cmd in category.commands"
                  :key="cmd.name"
                  size="small"
                  :bordered="true"
                >
                  <div class="linux-command">
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
        <NTabPane name="system" tab="系统命令">
          <NSpace vertical size="large">
            <NCard v-for="category in linuxCommands.system" :key="category.title" :title="category.title">
              <NSpace vertical size="medium">
                <NCard
                  v-for="cmd in category.commands"
                  :key="cmd.name"
                  size="small"
                  :bordered="true"
                >
                  <div class="linux-command">
                    <div class="command-header">
                      <NText strong>{{ cmd.name }}</NText>
                      <NTag size="small" type="info">{{ cmd.scenario }}</NTag>
                    </div>
                    <NText depth="2" style="margin: 8px 0;">{{ cmd.description }}</NText>
                    <NDivider style="margin: 8px 0;" />
                    <NText strong>示例：</NText>
                    <div v-if="highlightedCode[`system-${category.title}-${cmd.name}`]" v-html="highlightedCode[`system-${category.title}-${cmd.name}`]" class="shiki-code"></div>
                    <div v-else class="loading-placeholder">加载中...</div>
                  </div>
                </NCard>
              </NSpace>
            </NCard>
          </NSpace>
        </NTabPane>
        <NTabPane name="scenarios" tab="使用场景">
          <NSpace vertical size="large">
            <NCard v-for="category in linuxCommands.scenarios" :key="category.title" :title="category.title">
              <NSpace vertical size="medium">
                <NCard
                  v-for="scenario in category.scenarios"
                  :key="scenario.title"
                  size="small"
                  :bordered="true"
                >
                  <div class="linux-scenario">
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
.linux-page {
  max-width: 1200px;
  margin: 0 auto;
}

.linux-command {
  padding: 8px 0;
}

.linux-scenario {
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
