<template>
  <div class="product-container">
    <div v-if="errorMsg" class="error-message">
      {{ errorMsg }}
    </div>

    <div v-else-if="product" class="product-details">
      <h1>产品 {{ product.ID }}</h1>
      <div class="section">
        <h2>产品介绍</h2>
        <p>{{ product.产品介绍 }}</p>
      </div>
      <div class="section">
        <h2>使用方法</h2>
        <p>{{ product.使用方法 }}</p>
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
