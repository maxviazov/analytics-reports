import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  /**
   * Create a new post
   * @param createPostDto - Data transfer object for creating a post
   * @returns The created post
   */
  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const newPost = this.postRepository.create(createPostDto);
      return await this.postRepository.save(newPost);
    } catch (error: any) {
      this.logger.error('Failed to create post', error.stack);
      throw error;
    }
  }

  /**
   * Find all posts
   * @returns An array of posts
   */
  async findAll(): Promise<Post[]> {
    try {
      return await this.postRepository.find({
        relations: ['user'],
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch posts', error.stack);
      throw error;
    }
  }

  /**
   * Find a post by ID
   * @param id - The ID of the post to find
   * @returns The found post
   */
  async findOne(id: number): Promise<Post> {
    try {
      const post = await this.postRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!post) {
        throw new Error(`Post with id: ${id} not found`);
      }
      return post;
    } catch (error: any) {
      this.logger.error('Failed to fetch post', error.stack);
      throw error;
    }
  }
}
