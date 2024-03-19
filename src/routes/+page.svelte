<script>
  import Footer from '$lib/components/Footer.svelte';
</script>

<section class="bg-background py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
          Elevate Your Boat Buying Experience
        </h1>
        <p class="text-xl text-muted-foreground mb-8">
          Discover the perfect boat with your Boat buddy, your trusted virtual advisor. Access an extensive collection of boats with detailed specifications and expert guidance at your fingertips.
        </p>
        <div class="flex space-x-4">
          <a href="/boat" class="inline-block px-6 py-3 text-lg font-semibold text-primary-foreground bg-primary rounded-md hover:bg-primary-foreground hover:text-primary">
            Get Started
          </a>
        </div>
      </div>
      <div class="blob-image">
        <img src="hero-image1.jpg" alt="Boat" class="w-full h-full object-cover">
      </div>
    </div>
  </div>
</section>


<section class="bg-primary text-primary-foreground py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl sm:text-4xl font-bold mb-4">
      Ready to Find Your Dream Boat?
    </h2>
    <p class="text-xl mb-8">
      Start your boat buying journey with BrokermyBoat today and experience the difference.
    </p>
    <a href="/boat" class="inline-block px-8 py-4 text-xl font-semibold bg-primary-foreground text-primary rounded-md hover:bg-primary hover:text-primary-foreground">
      Get Started
    </a>
  </div>
</section>

<Footer />