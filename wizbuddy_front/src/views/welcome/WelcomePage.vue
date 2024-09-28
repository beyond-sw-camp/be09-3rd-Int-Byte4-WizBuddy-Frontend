<template>
    <div class="landing-page">
        
      <header class="header">
        <div class="nav-left">
          <img src="@/assets/icons/welcome/logo2.svg" alt="Wiz Buddy Logo" class="logo-img" />
        </div>
        <nav class="nav">
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a  @click="goToLogin" >로그인</a></li>
          </ul>
        </nav>
      </header>
  
      <section class="hero-section">
        <div class="hero-content">
            <div class="left-logo">
          <img src="@/assets/icons//welcome/leftlogo.svg" alt="Wiz Buddy Logo" class="title" />
          <p class="subtitle">사장님과 아르바이트생을 위한 스마트 매니지먼트 솔루션</p></div>
          <div class="wiz-meaning">
            <p><strong style="font-size: x-large">W(Work)</strong> 업무 효율을 극대화하는 최적의 파트너</p>
            <p><strong style="font-size: x-large">I(Instant)</strong> 즉시 문제를 해결하고 소통을 원활하게</p>
            <p><strong style="font-size: x-large">Z(Zero)</strong> 스트레스 없이 모든 업무를 간편하게 관리</p>
          </div>
        </div>
        <div class="hero-image">
          <img src="@/assets/icons/welcome/blue.svg" alt="Wiz Buddy Character" class="character-img" />
        </div>
      </section>

      <!-- 새로운 섹션 추가 -->


</div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import card1 from '@/assets/icons/welcome/card1.svg';
import card2 from '@/assets/icons/welcome/card2.svg';
import card3 from '@/assets/icons/welcome/card3.svg';
import testimonial1 from '@/assets/icons/welcome/label11.svg';
import testimonial2 from '@/assets/icons/welcome/label22.svg';

export default {
  data() {
    return {
      activeSlide: 0,
      activeTestimonialSlide: 0,
      cards: [
        {
          image: card1,
        },
        {
          image: card2,
        },
        {
          image: card3,
        },
      ],
      testimonials: [
        {
          img: testimonial1,
          name: '사장 백경석 & 알바 유제은, 이나현',
          quote: '"매장 관리가 이렇게 쉬워질 줄 몰랐습니다!"',
          description:
            'WIZ BUDDY를 도입한 후 매장 운영이 훨씬 수월해졌습니다. \n 특히, 스케줄 관리와 업무 체크리스트 기능 .... \n 출근과 퇴근 기록도 자동으로 집계되니 일일이 확인할 필요도 없고..',
        },
        {
          img: testimonial2,
          name: '사장 조제훈 & 알바 이서현',
          quote: '"일정 확인과 업무 체크가 쉬워졌어요!"',
          description:
            '무엇보다 근무 스케줄을 실시간으로 확인할 수 있는 게 정말 유용해요.\n 만약 스케줄이 변경되면 알림이 바로 오기 때문에 놓치는 일이 없어요.\n 예전엔 사장님한테 따로 물어봐야 했는데...',
        },
    ],
    };
  },
  methods: {
    nextSlide() {
      this.activeSlide = (this.activeSlide + 1) % this.cards.length;
    },
    prevSlide() {
      this.activeSlide =
        this.activeSlide - 1 < 0
          ? this.cards.length - 1
          : this.activeSlide - 1;
    },
    nextTestimonialSlide() {
      this.activeTestimonialSlide =
        (this.activeTestimonialSlide + 1) % this.testimonials.length;
    },
    prevTestimonialSlide() {
      this.activeTestimonialSlide =
        this.activeTestimonialSlide - 1 < 0
          ? this.testimonials.length - 1
          : this.activeTestimonialSlide - 1;
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToSignup() {
      this.$router.push('/signup');
    },
  },
};



</script>


<style scoped src="@/assets/css/welcome/welcome.css">

</style>