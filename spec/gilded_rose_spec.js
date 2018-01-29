describe("Gilded Rose", function() {

  var items;

  beforeEach(function(){
    items = [];
  })

  describe("#update_quality", function() {
    // it("should do something", function() {
    //   items.push(new Item('+5 Dexterity Vest', 10, 20));
    //   items.push(new Item('Elixir of the Mongoose', 5, 7));
    //   items.push(new Item('Aged Brie', 2, 0));
    //   items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    //   items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    //   items.push(new Item('Conjured Mana Cake', 3, 6));
    //
    //   let result = update_quality(items);
    //
    //   expect(result).toBeDefined();
    // });

    describe("Normal item", function() {

      describe("#quality", function() {
        it('should degrade quality by one', function() {
          items.push(new Item('normal', 10, 20));

          let result = update_quality(items);
          let normalItemA = result[0];

          expect(normalItemA.quality).toEqual(19);
        });
        it('should degrade quality by 2 if sell_in is 0', function() {
          items.push(new Item('+5 Dexterity Vest', 0, 20));

          let result = update_quality(items);
          let normalItemA = result[0];

          expect(normalItemA.quality).toEqual(18);
        });
        it('quality is never negative', function() {
          items.push(new Item('+5 Dexterity Vest', 0, 1));

          let result = update_quality(items);
          let normalItemA = result[0];

          expect(normalItemA.quality).toEqual(0);
        });
        xit('quality is never more than 50', function() {
          items.push(new Item('+5 Dexterity Vest', 10, 100));

          let result = update_quality(items);
          let normalItemA = result[0];

          expect(normalItemA.quality).toEqual(50);
        });
      });

      describe("sell_in", function() {
        it('should lower sell_in by one', function() {
          items.push(new Item('+5 Dexterity Vest', 10, 20));
          items.push(new Item('Elixir of the Mongoose', 5, 7));

          let result = update_quality(items);
          let normalItemA = result[0];
          let normalItemB = result[1];

          expect(normalItemA.sell_in).toEqual(9);
          expect(normalItemB.sell_in).toEqual(4);
        });
      });
    });

    describe("Brie", function() {
      describe("#quality", function() {
        it('increases in quality by 1', function() {
          items.push(new Item('Aged Brie', 2, 0));

          let result = update_quality(items);
          let brie = result[0];

          expect(brie.quality).toEqual(1);
        });
        it('quality does not exceed 50', function() {
          items.push(new Item('Aged Brie', 2, 50));

          let result = update_quality(items);
          let brie = result[0];

          expect(brie.quality).toEqual(50);
        });
      });

      describe("#sell_in", function() {
        it('should lower sell_in by one', function() {
          items.push(new Item('Aged Brie', 2, 0));

          let result = update_quality(items);
          let brie = result[0];

          expect(brie.sell_in).toEqual(1);
        });
      });
      describe("#sell_in when 0", function() {
        it('should increase quality by 2', function() {
          items.push(new Item('Aged Brie', 0, 0));

          let result = update_quality(items);
          let brie = result[0];

          expect(brie.quality).toEqual(2);
        });
      });
    });

    describe("Sulfuras", function() {
      describe("#quality", function() {
        it('should not change', function() {

          items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
          let result = update_quality(items);
          let sulfuras = result[0];

          expect(sulfuras.quality).toEqual(80);
        });
      });
      describe("#sell_in", function() {
        it('should not change', function() {

          items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
          let result = update_quality(items);
          let sulfuras = result[0];

          expect(sulfuras.sell_in).toEqual(0);
        });
      });
    });

    describe("Backstage pass", function() {
      describe("#quality", function() {
        it('should increase by 1', function() {
          items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));

          let result = update_quality(items);
          let backstagePass = result[0];

          expect(backstagePass.quality).toEqual(21);
        });
        it('should increase by 2 when sell_in is 10 or less', function() {
          items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20));

          let result = update_quality(items);
          let backstagePass = result[0];

          expect(backstagePass.quality).toEqual(22);
        });
        it('should increase by 3 when sell_in is 5 or less', function() {
          items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20));

          let result = update_quality(items);
          let backstagePass = result[0];

          expect(backstagePass.quality).toEqual(23);
        });
        it('should drop to 0 when sell_in is 0', function() {
          items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0));

          let result = update_quality(items);
          let backstagePass = result[0];

          expect(backstagePass.quality).toEqual(0);
        });
      });
      describe("#sell_in", function() {
        it('should decrease by 1', function() {
          items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20));

          let result = update_quality(items);
          let backstagePass = result[0];

          expect(backstagePass.sell_in).toEqual(4);
        });
      });
    });
  });

});
