<?php
  // get the thumbnail ID
  $iid = get_post_thumbnail_id( $post->ID );
  if ( $iid ):
    $img = wp_get_attachment_image_src( $iid, 'featured-article' );
    $width = $img[1];
    $height = $img[2];
  endif;
  $has_image = $iid && $width >= 800;

$report_logo = wp_get_attachment_image_src(get_field('report_logo'), 'full');
$box_1_img = wp_get_attachment_image_src(get_field('box_1_image'), 'full');
$show_5_stars = get_field('show_5_stars');
$box_1_content = get_field('box_1_content');
$num_providers = get_field('number_of_5_star_providers');
$num_analysed = get_field('number_of_providers_analysed');
$box_2_img = wp_get_attachment_image_src(get_field('box_2_image'), 'full');
$box_3 = get_field('box_3');
$box_4 = get_field('box_4');
$box_5_img = wp_get_attachment_image_src(get_field('box_5_image'), 'full');
$box_5_large_text = get_field('box_5_large_text');
$box_5_small_text = get_field('box_5_small_text');
$box_6 = get_field('box_6');
$box_6_image = wp_get_attachment_image_src(get_field('box_6_image'), 'full');
$box_7_large_text = get_field('box_7_large_text');
$box_7_small_text = get_field('box_7_small_text');
$box_8_large_text = get_field('box_8_large_text');
$box_8_small_text = get_field('box_8_small_text');
?>

<article id="star-ratings-report-single" <?php post_class(); ?>>

  <div class="container star-ratings-report">

    <header class="has-image featured-image background-image" style="background-image: url('<?php echo $img[0]; ?>'); height: <?php echo $img[2]; ?>;">
      <div class="row">
        <div class="report-heading col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xs-offset-0 col-sm-offset-0 col-md-offset-1 col-lg-offset-1">
          <img src="<?php echo $report_logo[0]; ?>" alt="<?php echo get_the_title(get_field('report_logo')) ?>" class="report-logo pull-left" />
          <h1 class="entry-title h1 pull-right"><?php the_title(); ?></h1>
        </div>
      </div>
    </header>

    <section class="report-content">

      <div class="container-fluid content-wrap">

        <div class="row first-row">

          <div class="report-cell col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <div class="inner">
              <?php if ($box_1_img) { ?>
                <div class="box-1-img col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <img src="<?php echo $box_1_img[0]; ?>" alt="<?php echo get_the_title(get_field('box_1_img')) ?>" />
                </div>
              <?php } ?>
              <div class="box-1-text col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <?php if ($show_5_stars) { ?>
                  <p><span class="large"><?php echo $num_providers; ?></span> providers</p>
                    <img class="box-1-star" src="/wp-content/uploads/2016/01/Star.png" alt="Star" />
                    <img class="box-1-star" src="/wp-content/uploads/2016/01/Star.png" alt="Star" />
                    <img class="box-1-star" src="/wp-content/uploads/2016/01/Star.png" alt="Star" />
                    <img class="box-1-star" src="/wp-content/uploads/2016/01/Star.png" alt="Star" />
                    <img class="box-1-star" src="/wp-content/uploads/2016/01/Star.png" alt="Star" />
                  <p>rated 5 stars</p>
                <?php } else {
                  echo $box_1_content;
                } ?>
              </div>
            </div>
          </div>

          <div class="report-cell col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <div class="inner">
              <p class="pull-left margin-top-20 col-xs-4 col-md-6 col-lg-6"><span class="large"><?php echo $num_analysed; ?></span><br>providers<br>analyzed</p>
              <?php if ($box_2_img) { ?>
                <span class="col-xs-8 col-md-6 col-lg-6">
                  <img src="<?php echo $box_2_img[0]; ?>" alt="<?php echo get_the_title(get_field('box_2_img')) ?>" />
                </span>
              <?php } ?>
            </div>
          </div>

          <div class="report-cell col-xs-12 col-sm-12 col-md-5 col-lg-5">
            <div class="inner"><?php echo $box_3; ?></div>
          </div>

        </div><!-- .first-row -->
        <div class="row second-row">

          <div class="report-cell col-xs-5 col-sm-4 col-md-3 col-lg-3">
            <div class="inner"><?php echo $box_4; ?></div>
          </div>

          <div class="report-cell middle-right col-xs-7 col-sm-8 col-md-9 col-lg-9">
            <div class="inner">
              <?php if ($box_5_img) { ?>
                <div class="region-img col-xs-6 col-sm-6 col-md-5 col-lg-5 col-xs-offset-0 col-sm-offset-0 col-md-offset-1 col-lg-offset-1">
                  <img src="<?php echo $box_5_img[0]; ?>" alt="<?php echo get_the_title(get_field('box_5_image')) ?>" />
                </div>
              <?php } ?>
              <div class="region-text col-xs-6 col-sm-6 col-md-6 col-lg-6"><span class="large"><?php echo $box_5_large_text; ?></span>
                <p><?php echo $box_5_small_text; ?></p>
              </div>
            </div>
          </div>

        </div><!-- .second-row -->
        <div class="row third-row">

          <div class="report-cell col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <div class="inner">
              <div class="box-6-img col-xs-3 col-sm-2 col-md-3 col-lg-3">
                <?php if ($box_6_image) { ?>
                  <img src="<?php echo $box_6_image[0]; ?>" alt="<?php echo get_the_title(get_field('box_6_image')) ?>" />
                <?php } ?></div>
              <div class="col-xs-9 col-sm-10 col-md-9 col-lg-9"><?php echo $box_6; ?></div>
            </div>
          </div>

          <div class="report-cell col-xs-6 col-sm-5 col-md-3 col-lg-3">
            <div class="inner"><span class="large"><?php echo $box_7_large_text; ?></span>
              <p><?php echo $box_7_small_text; ?></p></div>
          </div>

          <div class="report-cell col-xs-6 col-sm-7 col-md-3 col-lg-3">
            <div class="inner"><span class="large"><?php echo $box_8_large_text; ?></span>
              <p><?php echo $box_8_small_text; ?></p></div>
          </div>

        </div><!-- .third-row -->

      </div><!-- .content-wrap -->

      <div class="report-buttons">
<?php
$button_1_text = get_field('compare_button');
$button_2_text = get_field('button_2_text');
$button_3_text = get_field('button_3_text');

$button_1_url = get_field('compare_button_url');
$button_2_url = get_field('button_2_url');
$button_3_url = get_field('button_3_url');
?>

        <div class="row button-container button-container-1">
          <div class="text-center">
            <?php if ($button_1_text) { ?>
              <a href="<?php echo $button_1_url; ?>" class="btn btn-primary" role="button"><?php echo $button_1_text; ?></a>
            <?php } ?>
          </div>
        </div>

        <div class="row button-container button-container-2">
          <div class="text-center">
            <?php if ($button_2_text) { ?>
              <a href="<?php echo $button_2_url; ?>" class="btn btn-default btn-link" role="button"><?php echo $button_2_text; ?></a>
            <?php } ?>
            <?php if ($button_3_text) { ?>
              <a href="<?php echo $button_3_url; ?>" class="btn btn-default btn-link" role="button"><?php echo $button_3_text; ?></a>
            <?php } ?>
          </div>
        </div>
      </div><!-- .report-buttons -->

    </section>
  </div>
</article>
