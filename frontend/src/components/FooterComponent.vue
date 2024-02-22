<template>
    <div class="footer">
        <div class="box-container" style="margin-bottom: 10px;">
            <div class="box">
                <RouterLink v-if="$route.path != '/segnalazioni'" to="/segnalazioni" class="btn">Segnala un errore</RouterLink>
            </div>
        </div>
        <div class="box-container">

            <div class="box">
                <h4>Powered by Esagra <span style="font-size: 1rem;">Ver 1.0.0</span></h4>
            </div>

            <div class="box">
                <a href="https://www.esagra.it" target="_blank" title="Link esagra">https://esagra.it</a>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'FooterComponent',

    computed: {
        ...mapState(['user'])
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }
}
</script>

<style scoped>
/* footer */
.footer {
    background: #fff;
    padding: 2rem 9%;
}

.footer .box-container {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1.5rem;
}

.footer .box-container .box .btn {
    width: 25%; 
    margin-left: 37.5%; 
    border: 1px inset black;
    color: #f32009e3;
    background-color: rgba(245, 245, 245, 0.601);
    padding: 4px 2.5px;
}

.footer .box-container .box .btn:hover {
    color: white;
    background-color: #f32009e3;
}

.footer .box-container .box h4 {
    font-size: 2rem;
    color: #130f40;
    padding: 1rem 0;
}

.footer .box-container .box p {
    font-size: 1.4rem;
    color: #666;
    padding: 1rem 0;
}

.footer .box-container .box a {
    display: block;
    font-style: italic;
    font-size: 2rem;
    color: #f38609;
    padding: 1rem 0;
}

.footer .box-container .box a:hover {
    color: #091cf3;
}

.footer .box-container .box a:hover i {
    padding-right: 2rem;
}

.footer .box-container .box a i {
    padding-right: .5rem;
    color: #27ae60;
}

.footer .bottom {
    padding-top: 1rem;
    text-align: center;
}

.footer .bottom .share {
    margin: 1.5rem 0;
}

.footer .bottom .share a {
    height: 4.5rem;
    width: 4.5rem;
    line-height: 4.5rem;
    font-size: 2rem;
    border-radius: .5rem;
    margin: 0 .3rem;
    color: #fff;
    background: #27ae60;
}

.footer .bottom .share a:hover {
    background: #130f40;
}

@media (max-width: 576px) {
    .footer .box-container {

        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));

    }

    .footer .box-container .box .btn {
    width: 52%; 
    margin-left: 24%;
}

}
</style>