<template>
  <footer v-if="check" class="footer" style="margin-top:50px; background-color: gainsboro !important">
    <div style="display:flex; justify-content:space-around; height:200px; width:100%">
      <div style="display: flex; flex-direction:column; justify-content: center;">
        <img @click="popup" :title="quote" src="http://pm1.narvii.com/7037/263a27ce8b5031366ead8ba70d8690ee7f588486r1-969-506v2_uhq.jpg" style="height:100%; opacity: 0.5; border-radius: 10px 10px 10px 10px; cursor:pointer">
        <a @click="randomQuote" title="Click to random quote, hover image to see the quote, click image for surprise!">Random Quote</a>
      </div>
      <div style="display: flex; justify-content:space-around; align-items:center; width:60%">
        <div style="text-align:center; margin-right:10px">
          <h1 style="font-size:35px; font-family:'Plavsky' !important; color: black">Gundamku</h1>
          <p>Jalan Raya Campurdarat-Bandung</p>
          <p>Dsn. Duwet RT 02 / RW 05</p>
          <p>Ds. Duwet, Kec. Pakel</p>
          <p>Kab. Tulungagung</p>
        </div>

        <div class="mapouter" >
          <div class="gmap_canvas" >
            <iframe
              width="300"
              height="300"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=-8.166171843061564%2C111.82794570922853&t=&z=15&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              style="width:370px !important; height:220px !important"
            ></iframe>
          </div>
        </div>
      </div>

    </div>
    <small style="margin-bottom:-100px"><strong>Rizky Anas Bukhori ©2019</strong></small>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      quotes: [
        `I'm the Boss of Tekkadan. Orga Itsuka.`,
        `This is nothing to me. Protecting my members is my job.`,
        `Shut up and let's go... Everyone's waiting.`,
        `Besides... I finally understand now, Mika.`,
        `We don't need any destinations. We just need to keep moving forward.`,
        `As long as we don't stop, the road will continue.`,
        `I'm not stopping. As long as you all don't stop, I'll be at the end waiting for you.`,
        `So hear me well. Don't you ever stop.`
      ],
      quote: ''
    }
  },
  methods: {
    popup() {
      this.$swal.fire({
        html: `
          <img src="https://vignette.wikia.nocookie.net/gundam/images/c/c2/%27%27SD_Gundam_G_Generation_Crossrays%27%27_Mikazuki_Argus.png/revision/latest/scale-to-width-down/185?cb=20190312043518">
          <img src="https://vignette.wikia.nocookie.net/gundam/images/9/94/%27%27SD_Gundam_G_Generation_Crossrays%27%27_Orga_Itsuka.png/revision/latest/scale-to-width-down/185?cb=20190312043039" style="transform: scaleX(-1)">          
          <div style="height:400px">
            <iframe style="height:100%; width:100%" src="https://www.youtube.com/embed/loxujxwIb5U?autoplay=1">
            </iframe>
          </div>
        `,
        heightAuto: false,
        width:'725px',
        customClass: 'swal-height',
        showConfirmButton: false,
        background: 'transparent'
      })
    },
    randomQuote () {
      let random = Math.floor(Math.random() * this.quotes.length)
      this.quote = this.quotes[random]
    }
  },
  computed: {
    check() {
      this.quote = this.quotes[0]
      return true
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: 'Plavsky'; 
  src: url('../assets/fonts/Plavsky Condensed Bold Italic.otf'); 
}

.swal-height{
  height: 400px !important
}
</style>
