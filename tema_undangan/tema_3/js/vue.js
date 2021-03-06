new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            dataApi: [],
            loading: true,
            value: 'home',
            items: [
              {
                src: 'https://digition.id/wp-content/uploads/2022/01/107077483-305398767491171-1941002224051595105-n-054ec2eac32ec6ec0469281ae9d35311-1.jpg',
              },
              {
                src: 'https://digition.id/wp-content/uploads/2022/01/107827249-446177529598899-739618938078378725-n-e154248ba002e139fef7d60d374e9d9d.jpg',
              },
              {
                src: 'https://digition.id/wp-content/uploads/2022/01/107378535-390608995231751-2801653375802710009-n-1ec00e7d9d4aa7cf58dc825091bbeb33.jpg',
              },
            ],
              openInvitation: false,
              ucapan: [],
              form: [{
                nama: '',
                ucapan: '',
                write_as: '',
                sosmed: '',
              }],

              displayDays: 0,
              displayHours: 0,
              displayMinutes: 0,
              displaySeconds: 0,
      isPlay: true,

        }
    },

    methods: {
      loadData() {
        this.loading = true;
        setTimeout(() => {
          axios.get('https://merestui.com/api/vindirendra').then(response => {
          this.dataApi = response.data.data;
          this.loading = false;
        });
        }, 1000);
      },
        copy(){
            this.selectText(this.$refs.rekening);
            document.execCommand('copy');
      },
        copy1(){
            this.selectText(this.$refs.rekening1);
            document.execCommand('copy');
        },

        scrollPlay(){
            var audio = this.$refs.audioElm;
            audio.play();
            this.openInvitation = true;
        },

        selectText(element) {
            var range;
            if (document.selection) {
              // IE
              range = document.body.createTextRange();
              range.moveToElementText(element);
              range.select();
            } else if (window.getSelection) {
              range = document.createRange();
              range.selectNode(element);
              window.getSelection().removeAllRanges();
              window.getSelection().addRange(range);
            }
          },

          kirimUcapan() {
            // this.ucapan.push({
            //   nama: this.form.nama,
            //   ucapan: this.form.ucapan,
            //   kehadiran: this.form.kehadiran,
            //   // reply: []
            // });
            axios.post('https://merestui.com/api/'+this.dataApi.order.url+'/comment/store',{
              ref_no: "1",
              name: this.form.nama,
              write_as: this.form.write_as,
              sosmed: this.form.sosmed,
              comment: this.form.ucapan,
            })
            this.form = [{
              nama: '',
              ucapan: '',
              write_as: '',
              sosmed: '',
              // reply: []
            }];
            this.loadData();
                        setTimeout(() => {
                this.scrollPlay();
                document.getElementById('chat').scrollIntoView();
            }, 2000);
              },

          openUrl(url){
            window.open(url, '_blank');
          },

          showRemaining() {
            const timer = setInterval(() => {
              const now = new Date();
              const tanggal = new Date(this.dataApi.wedding.countdown_readable).toString('yyyy-MM-dd');
              const end = new Date(tanggal);
              const distance = end.getTime() - now.getTime();      
              if (distance < 0) {
                clearInterval(timer);
                return;
              }
      
              const days = Math.floor(distance / this._days);
              const hours = Math.floor((distance % this._days) / this._hours);
              const minutes = Math.floor((distance % this._hours) / this._minutes);
              const seconds = Math.floor((distance % this._minutes) / this._seconds);
              this.displayMinutes = minutes < 10 ? '0' + minutes : minutes;
              this.displaySeconds = seconds < 10 ? '0' + seconds : seconds;
              this.displayHours = hours < 10 ? '0' + hours : hours;
              this.displayDays = days < 10 ? '0' + days : days;
            }, 1000);
          },
          playMe(){
            this.isPlay = !this.isPlay;
            let audio = this.$refs.audioElm;
            if(this.isPlay){
              audio.play();
            }else{
              audio.pause();
            }
          }
  },

  created() {
    this.loadData();
  },

  mounted() {
    this.showRemaining();
  },
  computed: {
    totalUcapan() {
      if(this.loading == false){
        return this.dataApi.comments.length;
      }
    },
    displayDesktop() {
      return this.$vuetify.breakpoint.width >= 500
    },
    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    },
    getDayOnlyAkad(){
      if(this.loading == false){
        return this.dataApi.wedding.tanggal_akad.split(' ')[0];
      }
    },
    getTanggalAkad(){
      if(this.loading == false){
        return this.dataApi.wedding.tanggal_akad.split(",")[1];
      }
    },
    getDayOnlyResepsi(){
      if(this.loading == false){
        return this.dataApi.wedding.tanggal_resepsi.split(' ')[0];
      }
    },
    getTanggalResepsi(){
      if(this.loading == false){
        return this.dataApi.wedding.tanggal_resepsi.split(",")[1];
      }
    },
    namaRekening(){
      if(this.loading == false){
        return this.dataApi.wedding.rek_1.split('-')[2];
      }
    },
    nomorRekening(){
      if(this.loading == false){
        return this.dataApi.wedding.rek_1.split('-')[1];
      }
    },
    namaRekening1(){
      if(this.loading == false){
        return this.dataApi.wedding.rek_2.split('-')[2];
      }
    },
    nomorRekening1(){
      if(this.loading == false){
        return this.dataApi.wedding.rek_2.split('-')[1];
      }
    }
  }
})