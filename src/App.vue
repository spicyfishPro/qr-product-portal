<template>
  <div class="product-container">
    <div v-if="errorMsg" class="error-message">
      {{ errorMsg }}
    </div>

    <div v-else-if="product" class="product-details">
      <h1>产品 {{ product.产品名称 }}</h1>
      <div class="section">
        <h2>产品介绍</h2>
        <p>{{ product.产品介绍 }}</p>
      </div>
      <div class="section">
        <h2>使用方法</h2>
        <p>{{ product.使用方法 }}</p>
      </div>
      <div class="section">
        <h2>公司简介</h2>
        <p style="text-indent: 2em">
          北京市“沃野丰肥”科技有限公司，是一支怀揣着农业绿色发展梦想的创业团队，致力于成为秸秆基智能缓释肥领域的领航者。我们以解决农业痛点为出发点，针对传统肥料带来的环境污染、成本高昂、肥效低下等问题，凭借前沿科技，研发出秸力丰和优效护两款木质素基缓释肥。
        </p>
        <p style="text-indent: 2em">
          公司核心团队汇聚了中国农业大学农学院和经济管理学院的精英学子，他们专业知识扎实、创新能力强，在各自领域深耕细作。同时，我们还拥有豪华的顾问团队，由石元春院士、程序教授等行业大咖为产品研发、产业应用等提供全方位指导。
        </p>
        <p style="text-indent: 2em">
          我们通过与秸秆回收商、化工企业紧密合作，保障原材料稳定供应；采用先进生产工艺，确保产品质量上乘。销售渠道多元化，线上线下协同发力，为广大农户提供便捷服务。不仅如此，我们还为农户量身定制施肥方案，提供农技培训，助力农业增产增收。
        </p>
        <p style="text-indent: 2em">
          沃野丰肥，以创新为驱动，以绿色为底色，以服务农业为使命，正稳步前行，期待与您携手共创农业美好未来！
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      product: null,
      errorMsg: "",
    };
  },
  async created() {
    // 加载产品数据
    try {
      const response = await fetch("/products.json");
      this.products = await response.json();

      // 解析URL参数
      const urlParams = new URLSearchParams(window.location.search);
      const id = parseInt(urlParams.get("id"), 10);

      if (!id) {
        this.errorMsg = "⚠️ 请添加URL参数。例如：?id=123321";
        return;
      }

      // 查找产品
      this.product = this.products.find((p) => p.ID === id);

      if (!this.product) {
        this.errorMsg = "❌ 找不到ID为 " + id + " 的产品";
      }
    } catch (error) {
      this.errorMsg = "⛔ 数据加载失败，请稍后重试";
    }
  },
};
</script>

<style>
.product-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.error-message {
  color: #dc3545;
  padding: 15px;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  background-color: #f8d7da;
}

.product-details {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section {
  margin: 20px 0;
}

h1 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

h2 {
  color: #3498db;
  margin-top: 1.5rem;
}

p {
  color: #7f8c8d;
  line-height: 1.6;
  white-space: pre-wrap;
}
</style>
