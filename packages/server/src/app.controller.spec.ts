import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { UrlService } from './url/url.service'

describe('AppController', () => {
  let appController: AppController

  const mockUrlService = {
    findBySlug: jest.fn(),
    createWithGeneratedSlug: jest.fn(),
    incrementClickCount: jest.fn(),
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: UrlService,
          useValue: mockUrlService,
        },
        EventEmitter2,
      ],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    describe('OK', () => {
      it('should return "Ok"', () => {
        expect(appController.ok()).toBe('Ok')
      })
    })

    describe('redirect', () => {
      it('should return 404 when slug does not exist', async () => {
        const mockResponse = {
          redirect: jest.fn(),
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        }

        mockUrlService.findBySlug.mockResolvedValue(null)

        await appController.redirect('nonexistent', mockResponse as any)

        expect(mockUrlService.findBySlug).toHaveBeenCalledWith('nonexistent')
        expect(mockResponse.status).toHaveBeenCalledWith(404)
        expect(mockResponse.send).toHaveBeenCalled()
      })

      it('should redirect to original URL', async () => {
        const mockUrl = {
          id: '1',
          slug: 'mySlug',
          originalUrl: 'https://chopchop.io',
          clickCount: 0,
        }
        const mockResponse = {
          redirect: jest.fn(),
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        }

        mockUrlService.findBySlug.mockResolvedValue(mockUrl)

        await appController.redirect('mySlug', mockResponse as any)

        expect(mockUrlService.findBySlug).toHaveBeenCalledWith('mySlug')
        expect(mockResponse.redirect).toHaveBeenCalledWith('https://chopchop.io')
      })
    })
  })
})
