<template>
  <div class="app-container">
    <el-table
      v-if="userListData.length>0"
      v-loading="listLoading"
      :data="userListData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" label="序号" width="95" align="center"></el-table-column>
      <el-table-column label="用户名" prop="userName" width="150" align="center"></el-table-column>
      <el-table-column label="用户昵称" prop="nickName" width="150" align="center"></el-table-column>

      <el-table-column label="用户头像" width="110" align="center">
        <template slot-scope="scope">
          <img
            style="width:100px; max-height: 100px"
            onerror="this.src=`http://www.gravatar.com/avatar/791c73d60b9a2f6fade8f72b78c635bf?s=200&r=pg&d=mm`"
            :src="`https://api.cat-shop.penkuoer.com${scope.row.avatar}`"
            :alt="scope.row.userName"
          >
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-delete"
            size="small"
            type="info"
            @click="infoHandle(scope.row._id)"
          >详情</el-button>
          <!-- <el-button
            icon="el-icon-delete"
            size="small"
            type="info"
            @click="editHandle(scope.row._id)"
          >修改</el-button>-->
          <el-button
            @click="delHandle(scope.row._id)"
            icon="el-icon-delete"
            size="small"
            type="danger"
          >删除</el-button>
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
import { getUsers, deleteUser } from '@/api/users'
import axios from 'axios'
export default {
  data() {
    return {
      userListData: [],
      listLoading: true,
      totalCount: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(page = 1) {
      // console.log(page)
      this.listLoading = true
      getUsers({
        page
      })
        .then(response => {
          console.log(typeof response)
          this.userListData = response.users
          // console.log(response.products)
          this.totalCount = response.totalCount
          this.listLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    infoHandle(id) {
      console.log(id)
      this.$router.push({ path: `user-info/${id}` })
    }
  }
}
</script>
