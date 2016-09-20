#import "VKVideoPlayer.h"
#import "VKAppDelegate.h"
#import "VKVideoPlayerViewController.h"

SpecBegin(VKVideoPlayer)

__block VKVideoPlayer *player;

beforeAll(^{
  [[DemoHTTPStreamingServer sharedInstance] start];
});
afterAll(^{
  [[DemoHTTPStreamingServer sharedInstance] stop];
});

beforeEach(^{
  player = [[VKVideoPlayer alloc] init];
});

describe(@"after initialized", ^{
  it(@"state should be Unknown", ^{
    expect(player.state).to.equal(VKVideoPlayerStateUnknown);
  });
});

describe(@"started loading then", ^{
  it(@"state should be Loading", ^AsyncBlock{

    id mock = [OCMockObject niceMockForProtocol:@protocol(VKVideoPlayerDelegate)];
    [[[mock expect] andDo:^(NSInvocation *invoke) {
      BOOL returnValue = YES;
      [invoke setReturnValue:&returnValue];
      done();
    }] shouldVideoPlayer:player changeStateTo:VKVideoPlayerStateContentLoading];

    player.delegate = mock;

    [player loadVideoWithStreamURL:[NSURL URLWithString:@"http://localhost:12345/ios_240.m3u8"]];
    expect(player.state).will.equal(VKVideoPlayerStateContentLoading);
  });
});

describe(@"started to play video then", ^{
  it(@"state should be Playing", ^AsyncBlock{
    id mock = [OCMockObject niceMockForProtocol:@protocol(VKVideoPlayerDelegate)];
    [mock setExpectationOrderMatters:YES];
    
    // 1. change state to Loading
    [[[mock expect] andReturnValue:OCMOCK_VALUE(YES)] shouldVideoPlayer:OCMOCK_ANY changeStateTo:VKVideoPlayerStateContentLoading];

    // check video which is able to start
    [[[mock expect] andReturnValue:OCMOCK_VALUE(YES)] shouldVideoPlayer:OCMOCK_ANY startVideo:OCMOCK_ANY];
    
    // 2. change state to Paused
    [[[mock expect] andReturnValue:OCMOCK_VALUE(YES)] shouldVideoPlayer:OCMOCK_ANY changeStateTo:VKVideoPlayerStateContentPaused];

    // 3. change state to Playing
    [[[mock expect] andDo:^(NSInvocation *invoke) {
      BOOL returnValue = YES;
      [invoke setReturnValue:&returnValue];
      done();
    }] shouldVideoPlayer:OCMOCK_ANY changeStateTo:VKVideoPlayerStateContentPlaying];

    player.delegate = mock;
    
    [player loadVideoWithStreamURL:[NSURL URLWithString:@"http://localhost:12345/ios_240.m3u8"]];
    expect(player.state).will.equal(VKVideoPlayerStateContentPlaying);
  });
});

SpecEnd