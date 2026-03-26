<script setup>
import { ref } from 'vue'
import { NPageHeader, NCard, NTab, NTabs, NTabPane, NTag, NSpace, NText, NDivider, NBadge, NIcon, NList, NListItem, NTooltip } from 'naive-ui'

const activeTab = ref('basic')

const aiCategories = {
  basic: [
    {
      title: 'AI 基础概念',
      items: [
        {
          title: '什么是 AI？',
          details: [
            'AI（Artificial Intelligence）是指让计算机模拟人类智能行为的技术',
            '包括机器学习、深度学习、自然语言处理等分支',
            '目标是让计算机能够感知、推理、学习和决策',
            'AI 分为弱 AI（专注特定任务）和强 AI（通用智能）',
            '目前主流应用是弱 AI，如语音助手、图像识别等',
            '强 AI 仍处于研究阶段，尚未实现',
            'AI 技术正在快速发展，应用场景不断扩展',
            'AI 伦理和安全性是重要的研究方向'
          ]
        },
        {
          title: '机器学习 vs 深度学习',
          details: [
            '机器学习是 AI 的子集，通过数据学习模式',
            '深度学习是机器学习的子集，使用神经网络',
            '机器学习需要手动提取特征，深度学习自动学习特征',
            '深度学习在大数据和复杂任务上表现更优',
            '机器学习算法包括决策树、SVM、随机森林等',
            '深度学习包括 CNN、RNN、Transformer 等',
            '机器学习计算资源需求较低，深度学习需要 GPU',
            '两者结合使用可以获得更好的效果'
          ]
        },
        {
          title: '神经网络基础',
          details: [
            '神经网络由输入层、隐藏层和输出层组成',
            '每个神经元接收输入，通过激活函数产生输出',
            '前向传播：数据从输入层流向输出层',
            '反向传播：通过梯度下降更新权重',
            '激活函数：ReLU、Sigmoid、Tanh 等',
            '损失函数：衡量预测值与真实值的差异',
            '优化器：SGD、Adam、RMSprop 等',
            '过拟合和欠拟合是常见问题'
          ]
        },
        {
          title: '数据处理',
          details: [
            '数据收集：确保数据质量和代表性',
            '数据清洗：处理缺失值、异常值',
            '数据标注：为监督学习准备标签',
            '数据划分：训练集、验证集、测试集',
            '数据增强：增加数据多样性，防止过拟合',
            '特征工程：提取有意义的特征',
            '数据标准化：将数据缩放到合适范围',
            '数据隐私：保护敏感信息'
          ]
        }
      ]
    },
    {
      title: 'AI 常用术语',
      items: [
        {
          title: '核心术语',
          details: [
            '监督学习：使用标注数据训练模型',
            '无监督学习：从无标注数据中发现模式',
            '半监督学习：结合少量标注和大量无标注数据',
            '强化学习：通过与环境交互学习最优策略',
            '迁移学习：将已学习的知识应用到新任务',
            '联邦学习：在保护数据隐私的前提下协作学习',
            '生成式 AI：生成新内容的 AI 系统',
            '判别式 AI：区分不同类别的 AI 系统'
          ]
        },
        {
          title: '模型评估',
          details: [
            '准确率（Accuracy）：正确预测的比例',
            '精确率（Precision）：预测为正例的样本中实际为正例的比例',
            '召回率（Recall）：实际为正例的样本中被正确预测的比例',
            'F1 分数：精确率和召回率的调和平均',
            'ROC 曲线：衡量模型在不同阈值下的表现',
            'AUC：ROC 曲线下的面积，越大越好',
            '混淆矩阵：展示模型预测结果的矩阵',
            '交叉验证：评估模型的泛化能力'
          ]
        }
      ]
    }
  ],
  frontend: [
    {
      title: '前端 AI 应用',
      items: [
        {
          title: '浏览器中的 AI',
          details: [
            'TensorFlow.js：在浏览器中运行机器学习模型',
            'ONNX.js：运行 ONNX 格式的模型',
            'WebAssembly：提高模型运行性能',
            'Web Workers：在后台线程运行模型',
            'IndexedDB：存储模型和数据',
            'Service Workers：离线使用模型',
            'WebGL：利用 GPU 加速计算',
            'WebNN API：浏览器原生 AI 加速'
          ]
        },
        {
          title: '前端 AI 库',
          details: [
            'TensorFlow.js：Google 的前端机器学习库',
            'ml5.js：基于 TensorFlow.js 的友好接口',
            'Brain.js：JavaScript 神经网络库',
            'Synaptic.js：JavaScript 神经网络库',
            'Natural：JavaScript 自然语言处理库',
            'compromise：轻量级 NLP 库',
            'face-api.js：人脸识别和分析',
            'tracking.js：计算机视觉库'
          ]
        },
        {
          title: '应用场景',
          details: [
            '图像识别：物体检测、人脸识别、场景识别',
            '自然语言处理：情感分析、文本分类、实体识别',
            '语音处理：语音识别、语音合成',
            '推荐系统：个性化内容推荐',
            '预测分析：用户行为预测',
            '游戏 AI：游戏中的智能对手',
            '增强现实：环境理解和交互',
            '辅助功能：语音控制、图像描述'
          ]
        },
        {
          title: '性能优化',
          details: [
            '模型压缩：减少模型大小和计算量',
            '模型量化：降低精度以提高速度',
            '懒加载：按需加载模型',
            '缓存策略：缓存模型和计算结果',
            '边缘计算：在设备端运行模型',
            '批处理：批量处理数据以提高效率',
            'Web Workers：避免阻塞主线程',
            'Progressive Web Apps：离线使用能力'
          ]
        }
      ]
    },
    {
      title: 'AI 工具集成',
      items: [
        {
          title: 'OpenAI API',
          details: [
            'GPT 模型：文本生成、对话、翻译',
            'DALL-E：图像生成',
            'Whisper：语音识别',
            'Embeddings：文本向量化',
            'API 调用方式：REST API',
            '认证方式：API Key',
            '速率限制：根据订阅计划',
            '最佳实践：合理使用缓存和批处理'
          ]
        },
        {
          title: 'Hugging Face',
          details: [
            'Transformers.js：在浏览器中运行 Hugging Face 模型',
            '预训练模型库：BERT、GPT、Stable Diffusion 等',
            'Pipeline API：简化模型使用',
            'Model Hub：访问和分享模型',
            'Tokenizers：文本 tokenization 工具',
            'Datasets：访问和处理数据集',
            'Inference API：云端模型推理',
            'Fine-tuning：模型微调'
          ]
        },
        {
          title: '其他 AI 服务',
          details: [
            'Google Cloud AI：视觉、语言、对话',
            'Microsoft Azure AI：认知服务',
            'Amazon AWS AI：rekognition、comprehend',
            '百度 AI：百度大脑',
            '阿里云 AI：视觉智能、自然语言处理',
            '腾讯云 AI：AI 开放平台',
            '讯飞 AI：语音识别和合成',
            '商汤科技：计算机视觉'
          ]
        }
      ]
    }
  ],
  practice: [
    {
      title: 'AI 开发实践',
      items: [
        {
          title: '前端 AI 项目架构',
          details: [
            '客户端 vs 服务端：模型部署位置',
            '混合架构：边缘计算 + 云端',
            '微服务：将 AI 功能模块化',
            'API 设计：RESTful 或 GraphQL',
            '认证和授权：保护 AI 服务',
            '监控和日志：追踪模型性能',
            '版本控制：模型和代码版本管理',
            'CI/CD：自动化部署流程'
          ]
        },
        {
          title: '模型选择和部署',
          details: [
            '模型选择：根据任务和性能需求',
            '模型训练：使用框架如 PyTorch、TensorFlow',
            '模型导出：转换为适合前端的格式',
            '模型优化：量化、剪枝、蒸馏',
            '模型部署：CDN、边缘节点、本地存储',
            '模型更新：无缝更新策略',
            '模型监控：性能和准确性监控',
            '回滚机制：出现问题时的恢复策略'
          ]
        },
        {
          title: 'AI 伦理和安全',
          details: [
            '数据隐私：保护用户数据',
            '算法偏见：识别和减轻偏见',
            '透明度：解释模型决策',
            '安全性：防止模型被攻击',
            '滥用预防：防止恶意使用',
            '合规性：遵守相关法规',
            '用户同意：获取适当的同意',
            '责任归属：明确责任边界'
          ]
        },
        {
          title: '未来趋势',
          details: [
            '边缘 AI：更强大的设备端能力',
            '联邦学习：保护隐私的协作学习',
            '多模态 AI：处理文本、图像、语音等',
            '自主 AI：更智能的自动化系统',
            'AI 辅助开发：提高开发效率',
            '个性化 AI：适应个人用户需求',
            '可持续 AI：降低能源消耗',
            '开源 AI：更开放的模型和工具'
          ]
        }
      ]
    },
    {
      title: '案例分析',
      items: [
        {
          title: '图像识别应用',
          details: [
            '物体检测：识别图像中的物体',
            '人脸识别：身份验证和分析',
            '图像分割：区分图像中的不同区域',
            '风格迁移：将一种艺术风格应用到图像',
            '超分辨率：提高图像分辨率',
            '图像生成：根据描述生成图像',
            '图像搜索：基于内容的图像检索',
            '图像增强：改善图像质量'
          ]
        },
        {
          title: '自然语言处理应用',
          details: [
            '聊天机器人：提供客户服务',
            '文本摘要：提取关键信息',
            '情感分析：分析用户情绪',
            '机器翻译：跨语言翻译',
            '问答系统：回答用户问题',
            '文本分类：自动分类文本',
            '命名实体识别：识别文本中的实体',
            '语法纠错：纠正文本中的错误'
          ]
        },
        {
          title: '语音应用',
          details: [
            '语音识别：将语音转换为文本',
            '语音合成：将文本转换为语音',
            '声纹识别：识别说话人身份',
            '语音情感分析：分析说话人情绪',
            '语音命令：通过语音控制应用',
            '语音翻译：实时语音翻译',
            '噪音消除：提高语音质量',
            '语音增强：改善语音清晰度'
          ]
        }
      ]
    }
  ]
}
</script>

<template>
  <div class="ai-page">
    <NPageHeader title="AI 相关知识" style="margin-bottom: 24px;">
      <template #subtitle>
        <NText depth="3">
          前端开发者必备的 AI 知识，包括基础概念、前端应用和实践指南
        </NText>
      </template>
    </NPageHeader>

    <NTabs v-model:value="activeTab" type="line" animated>
      <NTabPane name="basic" tab="AI 基础">
        <NSpace vertical size="large">
          <NCard v-for="category in aiCategories.basic" :key="category.title" :title="category.title">
            <NSpace vertical size="medium">
              <NCard
                v-for="item in category.items"
                :key="item.title"
                size="small"
                :bordered="true"
              >
                <div class="ai-item">
                  <NText strong>{{ item.title }}</NText>
                  <NDivider style="margin: 8px 0;" />
                  <NList>
                    <NListItem v-for="(detail, index) in item.details" :key="index">
                      <NTooltip placement="right">
                        <template #trigger>
                          <NText depth="2">{{ detail }}</NText>
                        </template>
                        <span>AI 核心概念</span>
                      </NTooltip>
                    </NListItem>
                  </NList>
                </div>
              </NCard>
            </NSpace>
          </NCard>
        </NSpace>
      </NTabPane>
      <NTabPane name="frontend" tab="前端 AI 应用">
        <NSpace vertical size="large">
          <NCard v-for="category in aiCategories.frontend" :key="category.title" :title="category.title">
            <NSpace vertical size="medium">
              <NCard
                v-for="item in category.items"
                :key="item.title"
                size="small"
                :bordered="true"
              >
                <div class="ai-item">
                  <NText strong>{{ item.title }}</NText>
                  <NDivider style="margin: 8px 0;" />
                  <NList>
                    <NListItem v-for="(detail, index) in item.details" :key="index">
                      <NTooltip placement="right">
                        <template #trigger>
                          <NText depth="2">{{ detail }}</NText>
                        </template>
                        <span>前端 AI 实践</span>
                      </NTooltip>
                    </NListItem>
                  </NList>
                </div>
              </NCard>
            </NSpace>
          </NCard>
        </NSpace>
      </NTabPane>
      <NTabPane name="practice" tab="AI 开发实践">
        <NSpace vertical size="large">
          <NCard v-for="category in aiCategories.practice" :key="category.title" :title="category.title">
            <NSpace vertical size="medium">
              <NCard
                v-for="item in category.items"
                :key="item.title"
                size="small"
                :bordered="true"
              >
                <div class="ai-item">
                  <NText strong>{{ item.title }}</NText>
                  <NDivider style="margin: 8px 0;" />
                  <NList>
                    <NListItem v-for="(detail, index) in item.details" :key="index">
                      <NTooltip placement="right">
                        <template #trigger>
                          <NText depth="2">{{ detail }}</NText>
                        </template>
                        <span>AI 项目实践</span>
                      </NTooltip>
                    </NListItem>
                  </NList>
                </div>
              </NCard>
            </NSpace>
          </NCard>
        </NSpace>
      </NTabPane>
    </NTabs>
  </div>
</template>

<style scoped>
.ai-page {
  max-width: 1200px;
  margin: 0 auto;
}

.ai-item {
  padding: 8px 0;
}

.ai-item .n-text {
  display: block;
  margin-bottom: 4px;
}
</style>
