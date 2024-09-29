<template>
  <div class="register-modal">
    <h2>매장 등록</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <input type="text" v-model="shop_name" placeholder="매장명" />
      </div>
      <div class="form-group">
        <input type="text" v-model="shop_location" placeholder="매장 주소" />
      </div>
      <div class="form-row">
        <div class="form-group time-input half-width">
          <input type="time" v-model="shop_open_time" placeholder="매장 오픈 시간" />
        </div>
        <div class="form-group half-width">
          <input type="text" v-model="business_num" placeholder="사업자 등록 번호" />
        </div>
      </div>
      <div class="button-group">
        <button type="button" @click="closeModal">취소</button>
        <button type="submit">등록</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, inject, defineProps, defineEmits } from 'vue';

const props = defineProps(['employer_code']);
const emit = defineEmits(['submit', 'close', 'shop-registered']);
const fetchStores = inject('fetchStores');

const shop_name = ref('');
const shop_location = ref('');
const shop_open_time = ref('09:00');
const business_num = ref('');

const onSubmit = async () => {
  if (!shop_name.value || !shop_location.value || !shop_open_time.value || !business_num.value) {
    alert('모든 필드를 입력해주세요.');
    return;
  }

  try {
    // 모든 매장을 가져와 최대 ID를 계산
    const response = await fetch('http://localhost:8080/shop');
    const shops = await response.json();

    const maxId = shops.length > 0 ? Math.max(...shops.map(shop => parseInt(shop.id, 10))) : 0;

    const newShop = {
      id: (maxId + 1).toString(),
      shop_name: shop_name.value,
      shop_location: shop_location.value,
      shop_open_time: shop_open_time.value,
      business_num: business_num.value,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      employer_code: props.employer_code, // props로 전달된 employer_code 사용
    };

    // 매장 등록
    const createResponse = await fetch('http://localhost:8080/shop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newShop),
    });

    if (createResponse.ok) {
      const newShopResponse = await createResponse.json();
      alert('매장등록이 완료되었습니다.');
      await fetchStores(); 
      emit('shop-registered', newShopResponse);
      closeModal();
    } else {
      alert('매장등록 중 오류가 발생했습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('서버 오류가 발생했습니다.');
  }
};

function closeModal() {
  emit('close');
}
</script>

<style scoped>
.register-modal {
  background-color: #e6f3ff;
  padding: 20px;
  border-radius: 15px;
  width: 350px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  border-radius: 20px;
  padding: 11px;
  overflow: hidden;
  background: rgba(217, 217, 217, 0.35);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.half-width {
  width: 48%;
}

.form-group input {
  width: 100%;
  padding: 5px;
  border: none;
  text-align: center;
  font-size: 14px;
  background-color: white;  
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
}

.form-group input::placeholder {
  color: #aaa;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  width: 48%;
  padding: 10px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  background-color: white;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.time-input {
  position: relative;
}

.time-input::before {
  content: "\25BC";
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 12px;
}
</style>
