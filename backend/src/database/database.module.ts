// src/database/database.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

const CONNECTION_TIMEOUT = 10000;

@Module({
  imports: [
    MongooseModule.forRootAsync({ 
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleOptions> => {
        const uri = configService.get<string>('DB_CONNECTION_STRING', 'mongodb://localhost:27017/kiotviet');
        console.log('🔍 MongoDB URI:', uri); // In ra để kiểm tra
        
        console.log(uri);
        console.log('🌐 Đang kết nối tới MongoDB...');

        return {
          uri,
          serverSelectionTimeoutMS: CONNECTION_TIMEOUT,
          connectionFactory: async (connection) => {
            try {
              await connection.asPromise();
              console.log('✅ Kết nối MongoDB thành công!');
            } catch (error) {
              console.error('❌ Lỗi kết nối MongoDB:', error.message);
              process.exit(1);
            }

            connection.on('disconnected', () => {
              console.warn('⚠️ Mất kết nối với MongoDB.');
            });

            return connection;
          },
        };
      },
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  async onModuleInit() {
    console.log('⏳ Đang chờ kết nối MongoDB hoàn tất...');
    try {
      await mongoose.connection.asPromise();
      console.log('🚀 MongoDB đã sẵn sàng, ứng dụng NestJS bắt đầu hoạt động!');
    } catch (error) {
      console.error('❌ Kết nối MongoDB thất bại:', error.message);
      process.exit(1);
    }
  }
}
