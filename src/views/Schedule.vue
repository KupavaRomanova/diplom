<template>
  <ion-page>
    <ion-content>

      <div class="card flex flex-row border-2 rounded bg-gray-50">
        
        <div class="top-row">
          <div class="num-group bg-blue-200">609-01</div>
          <div class="num-group bg-blue-200">605-01</div>
          <div class="type-les bg-cyan-200">Лекция</div>
        </div>

        <div class="bot-row">
          <div class="num-les bg-slate-400">1</div>
          <div class="line bg-black"></div>
          <div class="name-les bg-slate-50 text-black">Теория разработки программного обеспечения</div>
          <div class="num-aud bg-blue-400">А-321</div>
        </div>

      </div>


    </ion-content>
  </ion-page>
</template>




<style scoped>

#container {
  /* text-align: center;
  width: 50%;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%); */
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
}
.card {

  /* height: 85px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);

}

.num-les {

  width: 40px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.line {

  width: 1px;
  height: 59px;
  border-radius: 29px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);

}

.num-group {
  /* font-size: 12px; */


  width: 70px;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2px 6px;
  border-radius: 8px;
  border: 1px solid rgba(158, 195, 239, 1);

}

.name-les {

  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
}

.num-aud {

  border-radius: 8px;
  width: 59px;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.type-les {

  padding: 2px 6px;
  border-radius: 8px;
  border: 1px solid rgba(177, 241, 245, 1);

  width: 56px;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-row {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* width: 100%; */
  /* height: 50px; */
}

.bot-row {
  display: flex;
  align-items: center;
  width: 100%;
  /* height: 100px; */
}

/* .rectangl-text {
  position: absolute;
  top: 13px;
  right: 53px;
  font-size: 10px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
} */
</style>

<!-- <style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
} -->

 <!-- .container {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
}
.component1 {
  width: 100%;
  height: 85px;
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
}  -->
