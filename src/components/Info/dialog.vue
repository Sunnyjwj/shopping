<template>
  <div>
    <el-dialog
    :title='dialog.title'
    :visible.sync="dialog.show">
        <el-form
        :model="formData"
        ref="form"
        >
          <el-form-item label="商品名称" >
            <el-input  v-model="formData.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="formData.descriptions" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" :label-width="formLabelWidth">
            <el-input v-model="formData.createdAt" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="更新时间" :label-width="formLabelWidth">
            <el-input v-model="formData.updatedAt" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" :label-width="formLabelWidth">
             <el-upload
                class="avatar-uploader"
                action="http://api.cat-shop.penkuoer.com/api/v1/common/file_upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="formData.coverImg" :src="formData.coverImg | resetImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { productCate, editInfo,addNewProducts } from '@/api/goodscategory';
import { getToken } from "@/utils/auth";
import { MessageBox } from 'element-ui';
export default {
  name:'dialog',
  props:{
    dialog:Object,
    formData:Object
  },
    data(){
      return{
         dialogImageUrl: '',
          dialogVisible: false,
          title:'修改商品',
          dialogFormVisible: false,
          form: {
            name: '',
          descriptions:'',
            delivery: false,
          updatedAt:'',
          createdAt:''
          },
          formLabelWidth: '120px'
      };
    },
    filters:{
      resetImg(val){
      return "https://api.cat-shop.penkuoer.com"+val
      }
    },
      methods: {
         onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const type = this.dialog.option
          if (type == 'add') {
            console.log(this.formData)
            addNewProducts(this.formData)
              .then(res => {
                this.dialog.show = false
                this.$emit('updateData')
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                })
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            console.log(this.formData.coverImg)
            editInfo(this.formData._id, this.formData)
              .then(res => {
                this.dialog.show = false
                // 传递到父组件 刷新
                this.$emit('update')
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                })
              })
              .catch(err => {
                console.log(err)
              })
          }
        }
      })
    },

          handleAvatarSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res)
            this.formData.coverImg =res.info
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
        },

      },

  }
</script>

<style scoped>
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
