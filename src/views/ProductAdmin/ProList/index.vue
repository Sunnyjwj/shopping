<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" label="序号" width="95" align="center"></el-table-column>
      <el-table-column label="名字" prop="name" width="150" align="center"></el-table-column>
      <el-table-column label="图片" width="110" align="center">
        <template slot-scope="scope">
          <img
            style="width:100px; max-height: 100px"
            :src="'https://api.cat-shop.penkuoer.com'+scope.row.coverImg"
            :alt="scope.row.name"
          >
        </template>
      </el-table-column>
      <el-table-column label="描述" width="400" align="center">
        <template slot-scope="scope">{{ scope.row.descriptions }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="价格" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.price }}</template>

      </el-table-column>
      <el-table-column align="center" prop="created_at" label="库存" width="110">
        <template slot-scope="scope">

          <span>{{ scope.row.quantity }}</span>
        </template>
      </el-table-column>
       <el-table-column class-name="status-col" label="操作" width="200" align="center">
        <template slot-scope="scope">

          <router-link :to="{
            name:'EditProduct',
            query:{
              id:scope.row._id,
              name:scope.row.name
            }
          }">
              <el-button icon="el-icon-edit" size="small" type="info">修改</el-button>
          </router-link>
            <el-button @click="delHandle(scope.row._id)" icon="el-icon-delete" size="small" type="danger">删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <!-- current-change页面选择改变之后触发 -->
      <el-pagination @current-change="fetchData" layout="prev, pager, next" :total="totalCount"></el-pagination>
    </div>


  </div>
</template>

<script>
import { getProducts,delProducts} from '@/api/products';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import { MessageBox } from 'element-ui';
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      totalCount: 0,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(page = 1) {
      // console.log(page)
      this.listLoading = true
      getProducts({
        page
      }).then(response => {
        this.list = response.products
        // console.log(response.products)
        this.totalCount = response.totalCount
        this.listLoading = false
      })
    },


   delHandle(id) {
          delProducts(id).then(res=>{
             console.log(res)
                 this.$message({
                type: 'success',
                message: '删除成功!'
                })
                 window.location.reload()
            })

          }


  }

}

</script>
