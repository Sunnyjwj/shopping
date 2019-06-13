<template>
  <div class="app-container">
    <el-form ref="form"  :model="form" :rules="rules" label-width="100px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商品简介">
        <el-input v-model="form.descriptions" type="textarea" />
      </el-form-item>
      <el-form-item label="价格" >
          <el-input style="width:180px"  v-model="form.price" >
            <template slot="append">元</template>
          </el-input>

      </el-form-item>
      <el-form-item label="库存" prop="stock">
            <el-input style="width:180px" v-model="form.quantity" clearable></el-input>
      </el-form-item>

      <el-form-item label="商品图片">
          <el-upload
        class="avatar-uploader"
        action="http://api.cat-shop.penkuoer.com/api/v1/common/file_upload"

        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="form.coverImg" :src="form.coverImg | resetImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="onSave(id)">保存</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { editProducts ,getInfoOfProduct} from '@/api/products';
import { MessageBox } from 'element-ui';
import axios from 'axios'
import { getToken } from '@/utils/auth';

// console.log(this.$route.query.id)
export default {
  data() {
    return {
      page:1,
      imageUrl: '',
      id:this.$route.query.id,
       form: {
          name: '',
          descriptions: '',
          price: '',
          quantity: '',
          imageUrl:''
        },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        stock:[
          {required:true,message: '请输入库存数量', trigger: 'blur'}
        ]

      },
    }
  },
  filters:{
    resetImg(val){
      return "https://api.cat-shop.penkuoer.com" + val
    }
  },
  methods: {
      async onSave(id) {
          const res = await editProducts(id,{
            name:this.form.name,
            descriptions:this.form.descriptions,
            quantity:this.form.quantity,
            price:this.form.price ,
            coverImg:this.form.coverImg
          })
          // console.log(res)
          this.$message('保存成功！！！');
          this.$router.push({name:'ProList'})
        },

    onReset() {
        this.$confirm('确认重置后将清空当前所有信息！！！', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '放弃'
        })
          .then(() => {
            // this.form.name='',
            //   this.form.descriptions='',
            //   this.form.price='',
            //   this.form.quantity=''
            //  res = this.form;
          })
          .catch(action => {

          });
      },

      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        this.form.coverImg = res.info
        // console.log(res)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },

  async created(){
    const res = await getInfoOfProduct(this.id)
    console.log(res)
    this.form = res
    // console.log(this.form.coverImg)
  },

}
</script>

<style scoped>
.line{
  text-align: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

