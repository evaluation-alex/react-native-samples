//
//  RootViewController.m
//  VKVideoPlayer
//
//  Created by Matsuo, Keisuke | Matzo | TRVDD on 4/20/14.
//  Copyright (c) 2014 Viki Inc. All rights reserved.
//

#import "DemoRootViewController.h"
#import "VKVideoPlayerViewController.h"
#import "DemoVideoPlayerViewController.h"
#import "VKVideoPlayerCaptionSRT.h"

typedef enum {
  DemoVideoPlayerIndexDefaultViewController = 0,
  DemoVideoPlayerIndexCustomViewController,
  DemoVideoPlayerIndexLength,
} DemoVideoPlayerIndex;

@interface DemoRootViewController ()

@end

@implementation DemoRootViewController

- (id)initWithStyle:(UITableViewStyle)style {
  self = [super initWithStyle:style];
  if (self) {
  }
  return self;
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  return DemoVideoPlayerIndexLength;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  NSString *cellIdentifier = @"DemoRootTableCell";
  UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
  if (!cell) {
    cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
  }
  
  switch (indexPath.row) {
    case DemoVideoPlayerIndexDefaultViewController:
      cell.textLabel.text = [NSString stringWithFormat:@"%@", [VKVideoPlayerViewController class]];
      break;
    case DemoVideoPlayerIndexCustomViewController:
      cell.textLabel.text = [NSString stringWithFormat:@"%@", [DemoVideoPlayerViewController class]];
      break;
  }
  
  return cell;
}

- (VKVideoPlayerCaption*)testCaption:(NSString*)captionName {
  NSString *filePath = [[NSBundle mainBundle] pathForResource:captionName ofType:@"srt"];
  NSData *testData = [NSData dataWithContentsOfFile:filePath];
  NSString *rawString = [[NSString alloc] initWithData:testData encoding:NSUTF8StringEncoding];
  
  VKVideoPlayerCaption *caption = [[VKVideoPlayerCaptionSRT alloc] initWithRawString:rawString];
  return caption;
}

#pragma mark - UITableViewDelegate
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];
  Class vcClass = NSClassFromString(cell.textLabel.text);
  UIViewController *viewController = [[vcClass alloc] init];
  
  [self presentModalViewController:viewController animated:YES];
  
  if ([viewController isKindOfClass:[VKVideoPlayerViewController class]]) {
    VKVideoPlayerViewController *videoController = (VKVideoPlayerViewController*)viewController;
    [videoController playVideoWithStreamURL:[NSURL URLWithString:@"http://localhost:12345/ios_240.m3u8"]];
    [videoController setSubtitle:[self testCaption:@"testCaptionBottom"]];
    
    [videoController.player setCaptionToTop:[self testCaption:@"testCaptionTop"]];
  }
}

@end
