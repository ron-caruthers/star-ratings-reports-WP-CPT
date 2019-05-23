<article <?php post_class(); ?>>
    <div class="container star-ratings-report-archive-page">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-8">
                <h1 class="entry-title h1">Star Ratings Reports Archive Page</h1>
            </div>
        </div>
        <section class="report-archive-content">

            <div class="container-fluid content-wrap">

                <div class="row">

                    <?php if(have_posts()) : while(have_posts()) : the_post(); ?>

                          <div class="report-cell col-md-5">

                            <div class="inner">
                              <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
                            </div>

                          </div>

                      <?php endwhile;

                    endif; ?>

                    </div>

                </div>

        </section>
    </div>
</article>
